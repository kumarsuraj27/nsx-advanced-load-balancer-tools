const asyncHandler = require("express-async-handler");
const data = require("../../data/mock/configuration.data");
const Sheet = require('../models/tools.model');
const db = require('../../server'); // Require the database connection

exports.getConfiguration = asyncHandler(async (req, res, next) => {
    // const result = await Sheet.find({field: "status_sheet"});
    const result = await Sheet.aggregate([
        {
            $project: {
                _id: 0,  // Exclude the _id field if you don't need it
                data: "$status_sheet"
            }
        }
    ]);

    const demo = {
        virtual: [{
            "index": 260,
            "F5_type": "virtual",
            "F5_SubType": " ",
            "F5_ID": "demo.brandon",
            "Status": "PARTIAL",
            "Skipped_settings": "['rules', 'serverssl-use-sni', \"rules: ['self_rul']\"]",
            "Indirect_mapping": "[]",
            "Not_Applicable": "[]",
            "User_Ignored": "[]",
            "Skipped_for_defaults": "",
            "Complexity_Level": "BASIC",
            "F5_Object": "creation-time: 2022-01-18:06:26:32\ndestination: /Common/2.2.2.2:443\nip-protocol: tcp\nlast-modified-time: 2023-07-10:00:23:21\nmask: 255.255.255.255\nprofiles:\n  /Common/Brandon-Webserver:\n    context: clientside\n  /Common/http: null\n  /Common/tcp: null\nrules:\n  /Common/self_rul: null\nserverssl-use-sni: disabled\nsource: 0.0.0.0/0\ntranslate-address: enabled\ntranslate-port: enabled\n",
            "Avi_Object": {
                "name": "demo.brandon",
                "description": null,
                "type": "VS_TYPE_NORMAL",
                "enabled": false,
                "traffic_enabled": false,
                "cloud_ref": "/api/cloud/?tenant=admin&name=Default-Cloud",
                "services": [
                    {
                        "port": "443",
                        "enable_ssl": true
                    }
                ],
                "application_profile_ref": "/api/applicationprofile/?tenant=admin&name=http-cmd",
                "vs_datascripts": [],
                "tenant_ref": "/api/tenant/?name=admin",
                "vh_type": "VS_TYPE_VH_SNI",
                "vrf_context_ref": "/api/vrfcontext/?tenant=admin&name=global&cloud=Default-Cloud",
                "vsvip_ref": "/api/vsvip/?tenant=admin&name=2.2.2.2-vsvip&cloud=Default-Cloud",
                "network_profile_ref": "/api/networkprofile/?tenant=admin&name=tcp",
                "ssl_profile_ref": "/api/sslprofile/?tenant=admin&name=Brandon-Webserver",
                "ssl_key_and_certificate_refs": [
                    "/api/sslkeyandcertificate/?tenant=admin&name=Brandon-Web-Server-auto_created"
                ]
            },
            "Vs_Mappings": [
                {
                    "F5_type": "profile",
                    "F5_ID": "http",
                    "F5_SubType": "http",
                    "Status": "SUCCESSFUL",
                    "avi_objects": [
                        {
                            "avi_name": "http-cmd",
                            "avi_type": "ApplicationProfile"
                        }
                    ]
                },
                {
                    "F5_type": "profile",
                    "F5_ID": "tcp",
                    "F5_SubType": "tcp",
                    "Status": "SUCCESSFUL",
                    "avi_objects": [
                        {
                            "avi_name": "tcp",
                            "avi_type": "NetworkProfile"
                        }
                    ]
                },
                {
                    "F5_type": "profile",
                    "F5_ID": "Brandon-Webserver",
                    "F5_SubType": "client-ssl",
                    "Status": "PARTIAL",
                    "avi_objects": [
                        {
                            "avi_name": "Brandon-Webserver",
                            "avi_type": "SSLProfile"
                        }
                    ]
                },
                {
                    "F5_type": "profile",
                    "F5_ID": "service",
                    "F5_SubType": "service",
                    "Status": "PARTIAL",
                    "avi_objects": [
                        {
                            "avi_name": "Brandon-Web-Server-auto_created",
                            "avi_type": "SSLKeyAndCertificate"
                        }
                    ]
                }
            ],
            "Needs_Review": null
        }]
    };

    const data = result[0].data;

    data.virtual = demo.virtual;

    const incompleteMigrationData = data.virtual.filter((virtual) => {
        return virtual.Status !== 'SUCCESSFUL';
    });

    incompleteMigrationData.length = 1;

    incompleteMigrationData.forEach(virtual => {
        virtual.flaggedObjects = virtual.Vs_Mappings.filter(mapping => mapping.Status !== 'SUCCESSFUL');

        virtual.flaggedObjects.forEach(object => {
            const objectF5TypeConfig = data[object.F5_type];
            const objectF5SubTypeConfig = object.F5_SubType ? objectF5TypeConfig[object.F5_SubType] : objectF5TypeConfig;

            object.F5_Object = getF5Config(objectF5SubTypeConfig, object.F5_ID) || '';

            object.avi_objects.forEach(object => {
                object.Avi_Object = {};
            });
        });
    });

    res.status(200).json(incompleteMigrationData);
});

function getF5Config(result, id) {
    if (Array.isArray(result)) {
        return result.find(element => element.F5_ID === id).F5_Object;
    }
}

function getF5Config(result, id) {
    if (Array.isArray(result)) {
        return result.find(element => element.F5_ID === id).F5_Object;
    }
}


exports.getLabControllerDetails = asyncHandler(async (req, res, next) => {
    const result = data.labControllerDetails;

    res.status(200).json(result);
});

exports.updateMigrationData = asyncHandler(async (req, res, next) => {
    const result = req.body

    res.status(200).json(result);
});

exports.startMigration = asyncHandler(async (req, res, next) => {
    const result = data.getAllIncompleteVSMigrationData;

    res.status(200).json(result);
});

exports.fetchFromController = asyncHandler(async (req, res, next) => {
    const result = data.getAllIncompleteVSMigrationData;

    res.status(200).json(result);
});

exports.setLabControllerDetails = asyncHandler(async (req, res, next) => {
    data.labControllerDetails = req.body;
    const result = data.labControllerDetails;

    res.status(200).json(result);
});
