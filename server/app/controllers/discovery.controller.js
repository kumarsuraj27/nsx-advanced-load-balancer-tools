const { spawn } = require('child_process');
const path = require("path")
const fs = require("fs")
const asyncHandler = require('express-async-handler');
const DiscoveryModel = require('../models/discovery.model');

// Constants used in the APIs.
const F5_SSH_PORT = '443';
const CONTROLLER_VERSION = '30.2.1';
const TENANT_NAME = 'admin';
const VRF_NAME = 'global';
const CLOUD_NAME = 'Default-Cloud';
const OUTPUT_FOLDER_NAME = 'migration';

// Run f5_converter, generate output, save in DB.
exports.generateReport = asyncHandler(async (req, res, next) => {
    const { f5_host_ip, f5_ssh_user, f5_ssh_password } = req.body;
    const outputFilePath = `./${OUTPUT_FOLDER_NAME}/${f5_host_ip}/output/bigip_discovery_data.json`;
    let dataToSend;
    let errorMessage;

    // Spawn new child process to call the python script.
    const pythonProcess = spawn('f5_converter.py', [
        '--f5_host_ip', f5_host_ip,
        '--f5_ssh_user', f5_ssh_user,
        '--f5_ssh_password', f5_ssh_password,
        '--f5_ssh_port', F5_SSH_PORT,
        '--vrf', VRF_NAME,
        '--tenant', TENANT_NAME,
        '--controller_version', CONTROLLER_VERSION,
        '--cloud_name', CLOUD_NAME,
        '-o', OUTPUT_FOLDER_NAME,
        '--discovery'
    ], {
        shell: true,
    });

    // pythonProcess.stdout.setEncoding('utf8');
    pythonProcess.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });

    // pythonProcess.stderr.setEncoding('utf8');
    pythonProcess.stderr.on('data', (data) => {
        errorMessage = data.toString();

        console.error('Error while executing f5_converter.py script. ', data.toString());
    });

    // On close event, we are sure that stream from child process is closed.
    pythonProcess.on('close', (code) => {
        console.log(dataToSend);
        console.log(`child process of f5_converter.py close all stdio with code ${code}`);

        if (code === 0) {
            // Save the report JSON into DB if it exists/generated by tool.
            if (fs.existsSync(outputFilePath)) {
                fs.readFile(outputFilePath, async function(err, data) {
                    if (data) {
                        const outputJson = JSON.parse(data);

                        try {
                            outputJson.downloadLink = outputFilePath.replace('./', '', 1); // Add the report download link

                            const saveResult = await DiscoveryModel.findOneAndUpdate({}, outputJson, { upsert: true });
                            console.log(saveResult);

                            res.status(200).json({ message: 'Report generated successfully.'});
                        } catch (err) {
                            res.status(500).json({ message: 'Error in saving the report.'});
                        }
                    } else {
                        res.status(500).json({ message: 'Error in reading the report, '+err.message});
                    }
                });
            } else {
                res.status(500).json({ message: 'Error output file not found.'});
            }
        } else {
            res.status(500).json({ message: errorMessage || 'Error in generating the report.' });
        }
    });
});

// Get the discovery report from DB.
exports.getReport = asyncHandler(async (req, res, next) => {
    try {
        const fetchResult = await DiscoveryModel.findOne();
        console.log(fetchResult);

        if (fetchResult) {
            res.status(200).json(fetchResult);
        } else {
            res.status(500).json({ message: 'No data found.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error in fetching report data.' });
    }
});

exports.downloadReport = asyncHandler(async (req, res, next) => {
    try {
        const fetchResult = await DiscoveryModel.findOne(
            {},
            { downloadLink: 1, _id: 0 }
        ).lean();

        if (fetchResult?.downloadLink) {
            const reportFileRelativePath = `./${fetchResult.downloadLink}`;

            res.download(reportFileRelativePath, (err) => {
                if (err) {
                    if (!res.headersSent) {
                        return res.status(404).json({ message: 'Error while downloading report. ' + err.message });
                    }
                }
            });
        } else {
            res.status(500).json({ message: 'Download link not found. ' + err.message });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error while fetching report path. ' + err.message });
    }
});
