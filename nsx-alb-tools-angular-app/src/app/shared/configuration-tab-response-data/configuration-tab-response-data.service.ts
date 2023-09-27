import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationTabService {
    public nsxAlbConfiguration = JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        gender: "male",
        age: 28,
        availableToHire: true,
        job: {
          company: 'freelance',
          role: 'developer',
          salary: 150,
          address: "demo",
        }
      });

    constructor() {}

    public resolveAfter = (value: any, delay: number) =>
        new Promise(resolve => {
            setTimeout(() => resolve(value), delay);
        });

    public getAllIncompleteVSMigrationData(): Promise<any> {
        const res = [{
            vsName: "vsName2",
            F5Obj : "destination: /Common/172.16.10.112:443\nip-protocol: tcp\nmask: 255.255.255.255\npool: /Common/hol-advanced-pool-10\nprofiles:\n  /Common/client_ssl_profile:\n    context: clientside\n  /Common/http: null\n  /Common/tcp: null\ntranslate-address: enabled\ntranslate-port: enabled\n",
            aviObj: this.nsxAlbConfiguration,
            status: "PARTIAL",
            ET: "25",
            flaggedObjects: [
              {
                objectName: "objectName2",
                needReview: true,
                type: "PARTIALLY_CONVERTED",
                F5Obj : "ack-on-push: enabled\nalert-timeout: '10'\nallow-non-ssl: disabled\napp-service: none\nauthenticate: once\nauthenticate-depth: '9'\nauthenticate-name: none\ncert-extension-includes: none\ncert-lifespan: '30'\ncert-lookup-by-ipaddr-port: disabled\nclient-cert-ca: none\nclient-close-timeout: '5'\nclose-wait-timeout: '5'\nconnpool-idle-timeout-override: '0'\nconnpool-max-reuse: '0'\nconnpool-max-size: '2048'\nconnpool-min-size: '0'\nconnpool-step: '4'\ndatagram-load-balancing: enabled\ndefaults-from: /Common/udp\ndeferred accept: disabled\ndelayed-acks: enabled\necn: disabled\nfin-wait-timeout: '5'\ngeneric-alert: enabled\nhandshake-timeout: '10'\nheader-insert: none\nidle-timeout: '5'\ninherit-certkeychain: 'false'\nkeep-alive-interval: disabled\nlayer-7: enabled\nlimited-transmit: enabled\nmax-renegotiations-per-minute: '5'\nmax-requests: '0'\nmod-ssl-methods: disabled\nmode: enabled\nmss-override: '0'\npassphrase: none\npeer-cert-mode: ignore\npeer-no-renegotiate-timeout: '10'\nproxy-buffer-high: '49152'\nproxy-buffer-low: '32768'\nproxy-ca-cert: none\nproxy-ca-key: none\nproxy-mss: disabled\nproxy-options: disabled\nproxy-ssl: disabled\nproxy-ssl-passthrough: disabled\nproxy-type: reverse\nretain-certificate: 'true'\nselective-acks: enabled\nsend-buffer-size: '65535'\nserver-close-timeout: '5'\nserver-name: none\nsession-mirroring: disabled\nsession-ticket: disabled\nsni-default: 'false'\nsni-require: 'false'\nssl-forward-proxy: disabled\nssl-forward-proxy-bypass: disabled\nssl-sign-hash: any\ntimestamps: enabled\nuri-exclude: none\nzero-window-timeout: '20000'\n",
                aviObj: '[{"network_profile": {"profile": {"type": "PROTOCOL_TYPE_UDP_FAST_PATH ", "udp_fast_path_profile ": {"per_pkt_loadbalance ": true, "session_idle_timeout ": "5"}}, "name": "udp_gtm_dns", "tenant_ref": " / api / tenant / ? name = admin "}}]',
              }
            ],
        }];

        return this.resolveAfter(res, 0);
    }
}

