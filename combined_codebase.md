# Project Source Code

## backend/db.js

```js
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
        trustServerCertificate: true,
        encrypt: false
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    connectionTimeout: 10000,
    requestTimeout: 30000
};

let pool;

async function getConnection() {
    if (!pool) {
        try {
            console.log('⏳ Connecting to SQL Server...');
            pool = await sql.connect(config);
            console.log('✅ Connected to SQL Server!');
        } catch (err) {
            console.error('❌ Connection failed:', err.message);
            process.exit(1);
        }
    }
    return pool;
}

module.exports = { getConnection, sql };
```

## backend/package-lock.json

```json
{
  "name": "backend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "backend",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "cors": "^2.8.6",
        "dotenv": "^17.3.1",
        "express": "^5.2.1",
        "mssql": "^12.2.0",
        "multer": "^2.1.1",
        "sharp": "^0.34.5"
      }
    },
    "node_modules/@azure-rest/core-client": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/@azure-rest/core-client/-/core-client-2.5.1.tgz",
      "integrity": "sha512-EHaOXW0RYDKS5CFffnixdyRPak5ytiCtU7uXDcP/uiY+A6jFRwNGzzJBiznkCzvi5EYpY+YWinieqHb0oY916A==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.1.2",
        "@azure/core-auth": "^1.10.0",
        "@azure/core-rest-pipeline": "^1.22.0",
        "@azure/core-tracing": "^1.3.0",
        "@typespec/ts-http-runtime": "^0.3.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/abort-controller": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/@azure/abort-controller/-/abort-controller-2.1.2.tgz",
      "integrity": "sha512-nBrLsEWm4J2u5LpAPjxADTlq3trDgVZZXHNKabeXZtpq3d3AbN/KGO82R87rdDz5/lYB024rtEf10/q0urNgsA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@azure/core-auth": {
      "version": "1.10.1",
      "resolved": "https://registry.npmjs.org/@azure/core-auth/-/core-auth-1.10.1.tgz",
      "integrity": "sha512-ykRMW8PjVAn+RS6ww5cmK9U2CyH9p4Q88YJwvUslfuMmN98w/2rdGRLPqJYObapBCdzBVeDgYWdJnFPFb7qzpg==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.1.2",
        "@azure/core-util": "^1.13.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/core-client": {
      "version": "1.10.1",
      "resolved": "https://registry.npmjs.org/@azure/core-client/-/core-client-1.10.1.tgz",
      "integrity": "sha512-Nh5PhEOeY6PrnxNPsEHRr9eimxLwgLlpmguQaHKBinFYA/RU9+kOYVOQqOrTsCL+KSxrLLl1gD8Dk5BFW/7l/w==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.1.2",
        "@azure/core-auth": "^1.10.0",
        "@azure/core-rest-pipeline": "^1.22.0",
        "@azure/core-tracing": "^1.3.0",
        "@azure/core-util": "^1.13.0",
        "@azure/logger": "^1.3.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/core-http-compat": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/@azure/core-http-compat/-/core-http-compat-2.3.2.tgz",
      "integrity": "sha512-Tf6ltdKzOJEgxZeWLCjMxrxbodB/ZeCbzzA1A2qHbhzAjzjHoBVSUeSl/baT/oHAxhc4qdqVaDKnc2+iE932gw==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.1.2"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "@azure/core-client": "^1.10.0",
        "@azure/core-rest-pipeline": "^1.22.0"
      }
    },
    "node_modules/@azure/core-lro": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/@azure/core-lro/-/core-lro-2.7.2.tgz",
      "integrity": "sha512-0YIpccoX8m/k00O7mDDMdJpbr6mf1yWo2dfmxt5A8XVZVVMz2SSKaEbMCeJRvgQ0IaSlqhjT47p4hVIRRy90xw==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.0.0",
        "@azure/core-util": "^1.2.0",
        "@azure/logger": "^1.0.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@azure/core-paging": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/@azure/core-paging/-/core-paging-1.6.2.tgz",
      "integrity": "sha512-YKWi9YuCU04B55h25cnOYZHxXYtEvQEbKST5vqRga7hWY9ydd3FZHdeQF8pyh+acWZvppw13M/LMGx0LABUVMA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@azure/core-rest-pipeline": {
      "version": "1.23.0",
      "resolved": "https://registry.npmjs.org/@azure/core-rest-pipeline/-/core-rest-pipeline-1.23.0.tgz",
      "integrity": "sha512-Evs1INHo+jUjwHi1T6SG6Ua/LHOQBCLuKEEE6efIpt4ZOoNonaT1kP32GoOcdNDbfqsD2445CPri3MubBy5DEQ==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.1.2",
        "@azure/core-auth": "^1.10.0",
        "@azure/core-tracing": "^1.3.0",
        "@azure/core-util": "^1.13.0",
        "@azure/logger": "^1.3.0",
        "@typespec/ts-http-runtime": "^0.3.4",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/core-tracing": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/@azure/core-tracing/-/core-tracing-1.3.1.tgz",
      "integrity": "sha512-9MWKevR7Hz8kNzzPLfX4EAtGM2b8mr50HPDBvio96bURP/9C+HjdH3sBlLSNNrvRAr5/k/svoH457gB5IKpmwQ==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/core-util": {
      "version": "1.13.1",
      "resolved": "https://registry.npmjs.org/@azure/core-util/-/core-util-1.13.1.tgz",
      "integrity": "sha512-XPArKLzsvl0Hf0CaGyKHUyVgF7oDnhKoP85Xv6M4StF/1AhfORhZudHtOyf2s+FcbuQ9dPRAjB8J2KvRRMUK2A==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.1.2",
        "@typespec/ts-http-runtime": "^0.3.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/identity": {
      "version": "4.13.0",
      "resolved": "https://registry.npmjs.org/@azure/identity/-/identity-4.13.0.tgz",
      "integrity": "sha512-uWC0fssc+hs1TGGVkkghiaFkkS7NkTxfnCH+Hdg+yTehTpMcehpok4PgUKKdyCH+9ldu6FhiHRv84Ntqj1vVcw==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.0.0",
        "@azure/core-auth": "^1.9.0",
        "@azure/core-client": "^1.9.2",
        "@azure/core-rest-pipeline": "^1.17.0",
        "@azure/core-tracing": "^1.0.0",
        "@azure/core-util": "^1.11.0",
        "@azure/logger": "^1.0.0",
        "@azure/msal-browser": "^4.2.0",
        "@azure/msal-node": "^3.5.0",
        "open": "^10.1.0",
        "tslib": "^2.2.0"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/keyvault-common": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@azure/keyvault-common/-/keyvault-common-2.0.0.tgz",
      "integrity": "sha512-wRLVaroQtOqfg60cxkzUkGKrKMsCP6uYXAOomOIysSMyt1/YM0eUn9LqieAWM8DLcU4+07Fio2YGpPeqUbpP9w==",
      "license": "MIT",
      "dependencies": {
        "@azure/abort-controller": "^2.0.0",
        "@azure/core-auth": "^1.3.0",
        "@azure/core-client": "^1.5.0",
        "@azure/core-rest-pipeline": "^1.8.0",
        "@azure/core-tracing": "^1.0.0",
        "@azure/core-util": "^1.10.0",
        "@azure/logger": "^1.1.4",
        "tslib": "^2.2.0"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@azure/keyvault-keys": {
      "version": "4.10.0",
      "resolved": "https://registry.npmjs.org/@azure/keyvault-keys/-/keyvault-keys-4.10.0.tgz",
      "integrity": "sha512-eDT7iXoBTRZ2n3fLiftuGJFD+yjkiB1GNqzU2KbY1TLYeXeSPVTVgn2eJ5vmRTZ11978jy2Kg2wI7xa9Tyr8ag==",
      "license": "MIT",
      "dependencies": {
        "@azure-rest/core-client": "^2.3.3",
        "@azure/abort-controller": "^2.1.2",
        "@azure/core-auth": "^1.9.0",
        "@azure/core-http-compat": "^2.2.0",
        "@azure/core-lro": "^2.7.2",
        "@azure/core-paging": "^1.6.2",
        "@azure/core-rest-pipeline": "^1.19.0",
        "@azure/core-tracing": "^1.2.0",
        "@azure/core-util": "^1.11.0",
        "@azure/keyvault-common": "^2.0.0",
        "@azure/logger": "^1.1.4",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/@azure/logger": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/@azure/logger/-/logger-1.3.0.tgz",
      "integrity": "sha512-fCqPIfOcLE+CGqGPd66c8bZpwAji98tZ4JI9i/mlTNTlsIWslCfpg48s/ypyLxZTump5sypjrKn2/kY7q8oAbA==",
      "license": "MIT",
      "dependencies": {
        "@typespec/ts-http-runtime": "^0.3.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@azure/msal-browser": {
      "version": "4.29.1",
      "resolved": "https://registry.npmjs.org/@azure/msal-browser/-/msal-browser-4.29.1.tgz",
      "integrity": "sha512-1Vrt27du1cl4QHkzLc6L4aeXqliPIDIs5l/1I4hWWMXkXccY/EznJT1+pBdoVze0azTAI8sCyq5B4cBVYG1t9w==",
      "license": "MIT",
      "dependencies": {
        "@azure/msal-common": "15.16.1"
      },
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@azure/msal-common": {
      "version": "15.16.1",
      "resolved": "https://registry.npmjs.org/@azure/msal-common/-/msal-common-15.16.1.tgz",
      "integrity": "sha512-qxUG9TCl+TVSSX58onVDHDWrvT5CE0+NeeUAbkQqaESpSm79u5IePLnPWMMjCUnUR2zJd4+Bt9vioVRzLmJb2g==",
      "license": "MIT",
      "engines": {
        "node": ">=0.8.0"
      }
    },
    "node_modules/@azure/msal-node": {
      "version": "3.8.9",
      "resolved": "https://registry.npmjs.org/@azure/msal-node/-/msal-node-3.8.9.tgz",
      "integrity": "sha512-jZ0pw/BbdEUWGhomCaAiVDfXRI/9K56m5hTNqB/CzcbZEYhXm5qpK1cDngN1iXfwSfmUMorOUQ2FC0dyuQ9uRg==",
      "license": "MIT",
      "dependencies": {
        "@azure/msal-common": "15.16.1",
        "jsonwebtoken": "^9.0.0",
        "uuid": "^8.3.0"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.9.1.tgz",
      "integrity": "sha512-VYi5+ZVLhpgK4hQ0TAjiQiZ6ol0oe4mBx7mVv7IflsiEp0OWoVsp/+f9Vc1hOhE0TtkORVrI1GvzyreqpgWtkA==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.34.5.tgz",
      "integrity": "sha512-imtQ3WMJXbMY4fxb/Ndp6HBTNVtWCUI0WdobyheGf5+ad6xX8VIDO8u2xE4qc/fr08CKG/7dDseFtn6M6g/r3w==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.34.5.tgz",
      "integrity": "sha512-YNEFAF/4KQ/PeW0N+r+aVVsoIY0/qxxikF2SWdp+NRkmMB7y9LBZAVqQ4yhGCm/H3H270OSykqmQMKLBhBJDEw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.2.4.tgz",
      "integrity": "sha512-zqjjo7RatFfFoP0MkQ51jfuFZBnVE2pRiaydKJ1G/rHZvnsrHAOcQALIi9sA5co5xenQdTugCvtb1cuf78Vf4g==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.2.4.tgz",
      "integrity": "sha512-1IOd5xfVhlGwX+zXv2N93k0yMONvUlANylbJw1eTah8K/Jtpi15KC+WSiaX/nBmbm2HxRM1gZ0nSdjSsrZbGKg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.2.4.tgz",
      "integrity": "sha512-bFI7xcKFELdiNCVov8e44Ia4u2byA+l3XtsAj+Q8tfCwO6BQ8iDojYdvoPMqsKDkuoOo+X6HZA0s0q11ANMQ8A==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.2.4.tgz",
      "integrity": "sha512-excjX8DfsIcJ10x1Kzr4RcWe1edC9PquDRRPx3YVCvQv+U5p7Yin2s32ftzikXojb1PIFc/9Mt28/y+iRklkrw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.2.4.tgz",
      "integrity": "sha512-FMuvGijLDYG6lW+b/UvyilUWu5Ayu+3r2d1S8notiGCIyYU/76eig1UfMmkZ7vwgOrzKzlQbFSuQfgm7GYUPpA==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.2.4.tgz",
      "integrity": "sha512-oVDbcR4zUC0ce82teubSm+x6ETixtKZBh/qbREIOcI3cULzDyb18Sr/Wcyx7NRQeQzOiHTNbZFF1UwPS2scyGA==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.2.4.tgz",
      "integrity": "sha512-qmp9VrzgPgMoGZyPvrQHqk02uyjA0/QrTO26Tqk6l4ZV0MPWIW6LTkqOIov+J1yEu7MbFQaDpwdwJKhbJvuRxQ==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.2.4.tgz",
      "integrity": "sha512-tJxiiLsmHc9Ax1bz3oaOYBURTXGIRDODBqhveVHonrHJ9/+k89qbLl0bcJns+e4t4rvaNBxaEZsFtSfAdquPrw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.2.4.tgz",
      "integrity": "sha512-FVQHuwx1IIuNow9QAbYUzJ+En8KcVm9Lk5+uGUQJHaZmMECZmOlix9HnH7n1TRkXMS0pGxIJokIVB9SuqZGGXw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.2.4.tgz",
      "integrity": "sha512-+LpyBk7L44ZIXwz/VYfglaX/okxezESc6UxDSoyo2Ks6Jxc4Y7sGjpgU9s4PMgqgjj1gZCylTieNamqA1MF7Dg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.34.5.tgz",
      "integrity": "sha512-9dLqsvwtg1uuXBGZKsxem9595+ujv0sJ6Vi8wcTANSFpwV/GONat5eCkzQo/1O6zRIkh0m/8+5BjrRr7jDUSZw==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.34.5.tgz",
      "integrity": "sha512-bKQzaJRY/bkPOXyKx5EVup7qkaojECG6NLYswgktOZjaXecSAeCWiZwwiFf3/Y+O1HrauiE3FVsGxFg8c24rZg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.34.5.tgz",
      "integrity": "sha512-7zznwNaqW6YtsfrGGDA6BRkISKAAE1Jo0QdpNYXNMHu2+0dTrPflTLNkpc8l7MUP5M16ZJcUvysVWWrMefZquA==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.34.5.tgz",
      "integrity": "sha512-51gJuLPTKa7piYPaVs8GmByo7/U7/7TZOq+cnXJIHZKavIRHAP77e3N2HEl3dgiqdD/w0yUfiJnII77PuDDFdw==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.34.5.tgz",
      "integrity": "sha512-nQtCk0PdKfho3eC5MrbQoigJ2gd1CgddUMkabUj+rBevs8tZ2cULOx46E7oyX+04WGfABgIwmMC0VqieTiR4jg==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.34.5.tgz",
      "integrity": "sha512-MEzd8HPKxVxVenwAa+JRPwEC7QFjoPWuS5NZnBt6B3pu7EG2Ge0id1oLHZpPJdn3OQK+BQDiw9zStiHBTJQQQQ==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.34.5.tgz",
      "integrity": "sha512-fprJR6GtRsMt6Kyfq44IsChVZeGN97gTD331weR1ex1c1rypDEABN6Tm2xa1wE6lYb5DdEnk03NZPqA7Id21yg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.34.5.tgz",
      "integrity": "sha512-Jg8wNT1MUzIvhBFxViqrEhWDGzqymo3sV7z7ZsaWbZNDLXRJZoRGrjulp60YYtV4wfY8VIKcWidjojlLcWrd8Q==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.34.5.tgz",
      "integrity": "sha512-OdWTEiVkY2PHwqkbBI8frFxQQFekHaSSkUIJkwzclWZe64O1X4UlUjqqqLaPbUpMOQk6FBu/HtlGXNblIs0huw==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.7.0"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.34.5.tgz",
      "integrity": "sha512-WQ3AgWCWYSb2yt+IG8mnC6Jdk9Whs7O0gxphblsLvdhSpSTtmu69ZG1Gkb6NuvxsNACwiPV6cNSZNzt0KPsw7g==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.34.5.tgz",
      "integrity": "sha512-FV9m/7NmeCmSHDD5j4+4pNI8Cp3aW+JvLoXcTUo0IqyjSfAZJ8dIUmijx1qaJsIiU+Hosw6xM5KijAWRJCSgNg==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.34.5.tgz",
      "integrity": "sha512-+29YMsqY2/9eFEiW93eqWnuLcWcufowXewwSNIT6UwZdUUCrM3oFjMWH/Z6/TMmb4hlFenmfAVbpWeup2jryCw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@js-joda/core": {
      "version": "5.7.0",
      "resolved": "https://registry.npmjs.org/@js-joda/core/-/core-5.7.0.tgz",
      "integrity": "sha512-WBu4ULVVxySLLzK1Ppq+OdfP+adRS4ntmDQT915rzDJ++i95gc2jZkM5B6LWEAwN3lGXpfie3yPABozdD3K3Vg==",
      "license": "BSD-3-Clause"
    },
    "node_modules/@tediousjs/connection-string": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@tediousjs/connection-string/-/connection-string-0.6.0.tgz",
      "integrity": "sha512-GxlsW354Vi6QqbUgdPyQVcQjI7cZBdGV5vOYVYuCVDTylx2wl3WHR2HlhcxxHTrMigbelpXsdcZso+66uxPfow==",
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "25.5.0",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-25.5.0.tgz",
      "integrity": "sha512-jp2P3tQMSxWugkCUKLRPVUpGaL5MVFwF8RDuSRztfwgN1wmqJeMSbKlnEtQqU8UrhTmzEmZdu2I6v2dpp7XIxw==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.18.0"
      }
    },
    "node_modules/@types/readable-stream": {
      "version": "4.0.23",
      "resolved": "https://registry.npmjs.org/@types/readable-stream/-/readable-stream-4.0.23.tgz",
      "integrity": "sha512-wwXrtQvbMHxCbBgjHaMGEmImFTQxxpfMOR/ZoQnXxB1woqkUbdLGFDgauo00Py9IudiaqSeiBiulSV9i6XIPig==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@typespec/ts-http-runtime": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/@typespec/ts-http-runtime/-/ts-http-runtime-0.3.4.tgz",
      "integrity": "sha512-CI0NhTrz4EBaa0U+HaaUZrJhPoso8sG7ZFya8uQoBA57fjzrjRSv87ekCjLZOFExN+gXE/z0xuN2QfH4H2HrLQ==",
      "license": "MIT",
      "dependencies": {
        "http-proxy-agent": "^7.0.0",
        "https-proxy-agent": "^7.0.0",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/abort-controller": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
      "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
      "license": "MIT",
      "dependencies": {
        "event-target-shim": "^5.0.0"
      },
      "engines": {
        "node": ">=6.5"
      }
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/append-field": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/append-field/-/append-field-1.0.0.tgz",
      "integrity": "sha512-klpgFSWLW1ZEs8svjfb7g4qWY0YS5imI82dTg+QahUvJ8YqAY0P10Uk8tTyh9ZGuYEZEMaeJYCF5BFuX552hsw==",
      "license": "MIT"
    },
    "node_modules/base64-js": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/base64-js/-/base64-js-1.5.1.tgz",
      "integrity": "sha512-AKpaYlHn8t4SVbOHCy+b5+KKgvR4vrsD8vbvrbiQJps7fKDTkjkDry6ji0rUJjC0kzbNePLwzxq8iypo41qeWA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/bl": {
      "version": "6.1.6",
      "resolved": "https://registry.npmjs.org/bl/-/bl-6.1.6.tgz",
      "integrity": "sha512-jLsPgN/YSvPUg9UX0Kd73CXpm2Psg9FxMeCSXnk3WBO3CMT10JMwijubhGfHCnFu6TPn1ei3b975dxv7K2pWVg==",
      "license": "MIT",
      "dependencies": {
        "@types/readable-stream": "^4.0.0",
        "buffer": "^6.0.3",
        "inherits": "^2.0.4",
        "readable-stream": "^4.2.0"
      }
    },
    "node_modules/body-parser": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.2.tgz",
      "integrity": "sha512-oP5VkATKlNwcgvxi0vM0p/D3n2C3EReYVX+DNYs5TjZFn/oQt2j+4sVJtSMr18pdRr8wjTcBl6LoV+FUwzPmNA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^1.0.5",
        "debug": "^4.4.3",
        "http-errors": "^2.0.0",
        "iconv-lite": "^0.7.0",
        "on-finished": "^2.4.1",
        "qs": "^6.14.1",
        "raw-body": "^3.0.1",
        "type-is": "^2.0.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/buffer": {
      "version": "6.0.3",
      "resolved": "https://registry.npmjs.org/buffer/-/buffer-6.0.3.tgz",
      "integrity": "sha512-FTiCpNxtwiZZHEZbcbTIcZjERVICn9yq/pDFkTl95/AxzD1naBctN7YO68riM/gLSDY7sdrMby8hofADYuuqOA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "base64-js": "^1.3.1",
        "ieee754": "^1.2.1"
      }
    },
    "node_modules/buffer-equal-constant-time": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/buffer-equal-constant-time/-/buffer-equal-constant-time-1.0.1.tgz",
      "integrity": "sha512-zRpUiDwd/xk6ADqPMATG8vc9VPrkck7T07OIx0gnjmJAnHnTVXNQG3vfvWNuiZIkwu9KrKdA1iJKfsfTVxE6NA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/buffer-from": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
      "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
      "license": "MIT"
    },
    "node_modules/bundle-name": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bundle-name/-/bundle-name-4.1.0.tgz",
      "integrity": "sha512-tjwM5exMg6BGRI+kNmTntNsvdZS1X8BFYS6tnJ2hdH0kVxM6/eVZ2xy+FqStSWvYmtfFMDLIxurorHwDKfDz5Q==",
      "license": "MIT",
      "dependencies": {
        "run-applescript": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/commander": {
      "version": "11.1.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-11.1.0.tgz",
      "integrity": "sha512-yPVavfyCcRhmorC7rWlkHn15b4wDVgVmBA7kV4QVBsF7kv/9TKJAbAXVTxvTnwP8HHKjRCJDClKbciiYS7p0DQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/concat-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-2.0.0.tgz",
      "integrity": "sha512-MWufYdFw53ccGjCA+Ol7XJYpAlW6/prSMzuPOTRnJGcGzuhLn4Scrz7qf6o8bROZ514ltazcIFJZevcfbo0x7A==",
      "engines": [
        "node >= 6.0"
      ],
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.0.2",
        "typedarray": "^0.0.6"
      }
    },
    "node_modules/concat-stream/node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/content-disposition": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.1.tgz",
      "integrity": "sha512-oIXISMynqSqm241k6kcQ5UwttDILMK4BiurCfGEREw6+X9jkkpEe5T9FZaApyLGGOnFuyMWZpdolTXMtvEJ08Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/default-browser": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/default-browser/-/default-browser-5.5.0.tgz",
      "integrity": "sha512-H9LMLr5zwIbSxrmvikGuI/5KGhZ8E2zH3stkMgM5LpOWDutGM2JZaj460Udnf1a+946zc7YBgrqEWwbk7zHvGw==",
      "license": "MIT",
      "dependencies": {
        "bundle-name": "^4.1.0",
        "default-browser-id": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/default-browser-id": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/default-browser-id/-/default-browser-id-5.0.1.tgz",
      "integrity": "sha512-x1VCxdX4t+8wVfd1so/9w+vQ4vx7lKd2Qp5tDRutErwmR85OgmfX7RlLRMWafRMY7hbEiXIbudNrjOAPa/hL8Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/define-lazy-prop": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-3.0.0.tgz",
      "integrity": "sha512-N+MeXYoqr3pOgn8xfyRPREN7gHakLYjhsHhWGT3fWAiL4IkAt0iDw14QiiEm2bE30c5XX5q0FtAA3CK5f9/BUg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/dotenv": {
      "version": "17.3.1",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.3.1.tgz",
      "integrity": "sha512-IO8C/dzEb6O3F9/twg6ZLXz164a2fhTnEWb95H23Dm4OuN+92NmEAlTrupP9VW6Jm3sO26tQlqyvyi4CsnY9GA==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ecdsa-sig-formatter": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/ecdsa-sig-formatter/-/ecdsa-sig-formatter-1.0.11.tgz",
      "integrity": "sha512-nagl3RYrbNv6kQkeJIpt6NJZy8twLB/2vtz6yN9Z4vRKHN4/QZJIEbqohALSgwKdnksuY3k5Addp5lg8sVoVcQ==",
      "license": "Apache-2.0",
      "dependencies": {
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/event-target-shim": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
      "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/events": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
      "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.8.x"
      }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.1",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/http-proxy-agent": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-7.0.2.tgz",
      "integrity": "sha512-T1gkAiYYDWYx3V5Bmyu7HcfcvL7mUrTWiM6yOfa3PIphViJ/gFPbvidQ+veqSOHci/PxBcDabeUNCzpOODJZig==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.0",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.2.tgz",
      "integrity": "sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ieee754": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/ieee754/-/ieee754-1.2.1.tgz",
      "integrity": "sha512-dcyqhDvX1C46lXZcVqCpK+FtMRQVdIMN6/Df5js2zouUsqG7I6sFxitIC+7KYK29KdXOLHdu9zL4sFnoVQnqaA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "license": "MIT",
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-inside-container": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-inside-container/-/is-inside-container-1.0.0.tgz",
      "integrity": "sha512-KIYLCCJghfHZxqjYBE7rEy0OBuTd5xCHS7tHVgvCLkx7StIoaxwNW3hCALgEUjFfeRk+MG/Qxmp/vtETEF3tRA==",
      "license": "MIT",
      "dependencies": {
        "is-docker": "^3.0.0"
      },
      "bin": {
        "is-inside-container": "cli.js"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/is-wsl": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-3.1.1.tgz",
      "integrity": "sha512-e6rvdUCiQCAuumZslxRJWR/Doq4VpPR82kqclvcS0efgt430SlGIk05vdCN58+VrzgtIcfNODjozVielycD4Sw==",
      "license": "MIT",
      "dependencies": {
        "is-inside-container": "^1.0.0"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/js-md4": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/js-md4/-/js-md4-0.3.2.tgz",
      "integrity": "sha512-/GDnfQYsltsjRswQhN9fhv3EMw2sCpUdrdxyWDOUK7eyD++r3gRhzgiQgc/x4MAv2i1iuQ4lxO5mvqM3vj4bwA==",
      "license": "MIT"
    },
    "node_modules/jsonwebtoken": {
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-9.0.3.tgz",
      "integrity": "sha512-MT/xP0CrubFRNLNKvxJ2BYfy53Zkm++5bX9dtuPbqAeQpTVe0MQTFhao8+Cp//EmJp244xt6Drw/GVEGCUj40g==",
      "license": "MIT",
      "dependencies": {
        "jws": "^4.0.1",
        "lodash.includes": "^4.3.0",
        "lodash.isboolean": "^3.0.3",
        "lodash.isinteger": "^4.0.4",
        "lodash.isnumber": "^3.0.3",
        "lodash.isplainobject": "^4.0.6",
        "lodash.isstring": "^4.0.1",
        "lodash.once": "^4.0.0",
        "ms": "^2.1.1",
        "semver": "^7.5.4"
      },
      "engines": {
        "node": ">=12",
        "npm": ">=6"
      }
    },
    "node_modules/jwa": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/jwa/-/jwa-2.0.1.tgz",
      "integrity": "sha512-hRF04fqJIP8Abbkq5NKGN0Bbr3JxlQ+qhZufXVr0DvujKy93ZCbXZMHDL4EOtodSbCWxOqR8MS1tXA5hwqCXDg==",
      "license": "MIT",
      "dependencies": {
        "buffer-equal-constant-time": "^1.0.1",
        "ecdsa-sig-formatter": "1.0.11",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/jws": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/jws/-/jws-4.0.1.tgz",
      "integrity": "sha512-EKI/M/yqPncGUUh44xz0PxSidXFr/+r0pA70+gIYhjv+et7yxM+s29Y+VGDkovRofQem0fs7Uvf4+YmAdyRduA==",
      "license": "MIT",
      "dependencies": {
        "jwa": "^2.0.1",
        "safe-buffer": "^5.0.1"
      }
    },
    "node_modules/lodash.includes": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/lodash.includes/-/lodash.includes-4.3.0.tgz",
      "integrity": "sha512-W3Bx6mdkRTGtlJISOvVD/lbqjTlPPUDTMnlXZFnVwi9NKJ6tiAk6LVdlhZMm17VZisqhKcgzpO5Wz91PCt5b0w==",
      "license": "MIT"
    },
    "node_modules/lodash.isboolean": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isboolean/-/lodash.isboolean-3.0.3.tgz",
      "integrity": "sha512-Bz5mupy2SVbPHURB98VAcw+aHh4vRV5IPNhILUCsOzRmsTmSQ17jIuqopAentWoehktxGd9e/hbIXq980/1QJg==",
      "license": "MIT"
    },
    "node_modules/lodash.isinteger": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/lodash.isinteger/-/lodash.isinteger-4.0.4.tgz",
      "integrity": "sha512-DBwtEWN2caHQ9/imiNeEA5ys1JoRtRfY3d7V9wkqtbycnAmTvRRmbHKDV4a0EYc678/dia0jrte4tjYwVBaZUA==",
      "license": "MIT"
    },
    "node_modules/lodash.isnumber": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/lodash.isnumber/-/lodash.isnumber-3.0.3.tgz",
      "integrity": "sha512-QYqzpfwO3/CWf3XP+Z+tkQsfaLL/EnUlXWVkIk5FUPc4sBdTehEqZONuyRt2P67PXAk+NXmTBcc97zw9t1FQrw==",
      "license": "MIT"
    },
    "node_modules/lodash.isplainobject": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/lodash.isplainobject/-/lodash.isplainobject-4.0.6.tgz",
      "integrity": "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA==",
      "license": "MIT"
    },
    "node_modules/lodash.isstring": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/lodash.isstring/-/lodash.isstring-4.0.1.tgz",
      "integrity": "sha512-0wJxfxH1wgO3GrbuP+dTTk7op+6L41QCXbGINEmD+ny/G/eCqGzxyCsh7159S+mgDDcoarnBw6PC1PS5+wUGgw==",
      "license": "MIT"
    },
    "node_modules/lodash.once": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/lodash.once/-/lodash.once-4.1.1.tgz",
      "integrity": "sha512-Sb487aTOCr9drQVL8pIxOzVhafOjZN9UU54hiN8PU3uAiSV7lx1yYNpbNmex2PK6dSJoNTSJUUswT651yww3Mg==",
      "license": "MIT"
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/mssql": {
      "version": "12.2.0",
      "resolved": "https://registry.npmjs.org/mssql/-/mssql-12.2.0.tgz",
      "integrity": "sha512-lwwLHAqcWOz8okjboQpIEp5OghUFGJhuuQZS3+WF1ZXbaEaCEGKOfiQET3w/5Xz0tyZfDNCQVCm9wp5GwXut6g==",
      "license": "MIT",
      "dependencies": {
        "@tediousjs/connection-string": "^0.6.0",
        "commander": "^11.0.0",
        "debug": "^4.3.3",
        "tarn": "^3.0.2",
        "tedious": "^19.0.0"
      },
      "bin": {
        "mssql": "bin/mssql"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/multer": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/multer/-/multer-2.1.1.tgz",
      "integrity": "sha512-mo+QTzKlx8R7E5ylSXxWzGoXoZbOsRMpyitcht8By2KHvMbf3tjwosZ/Mu/XYU6UuJ3VZnODIrak5ZrPiPyB6A==",
      "license": "MIT",
      "dependencies": {
        "append-field": "^1.0.0",
        "busboy": "^1.6.0",
        "concat-stream": "^2.0.0",
        "type-is": "^1.6.18"
      },
      "engines": {
        "node": ">= 10.16.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/multer/node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/multer/node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/native-duplexpair": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/native-duplexpair/-/native-duplexpair-1.0.0.tgz",
      "integrity": "sha512-E7QQoM+3jvNtlmyfqRZ0/U75VFgCls+fSkbml2MpgWkWyz3ox8Y58gNhfuziuQYGNNQAbFZJQck55LHCnCK6CA==",
      "license": "MIT"
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/open": {
      "version": "10.2.0",
      "resolved": "https://registry.npmjs.org/open/-/open-10.2.0.tgz",
      "integrity": "sha512-YgBpdJHPyQ2UE5x+hlSXcnejzAvD0b22U2OuAP+8OnlJT+PjWPxtgmGqKKc+RgTM63U9gN0YzrYc71R2WT/hTA==",
      "license": "MIT",
      "dependencies": {
        "default-browser": "^5.2.1",
        "define-lazy-prop": "^3.0.0",
        "is-inside-container": "^1.0.0",
        "wsl-utils": "^0.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-to-regexp": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.3.0.tgz",
      "integrity": "sha512-7jdwVIRtsP8MYpdXSwOS0YdD0Du+qOoF/AEPIt88PcCFrZCzx41oxku1jD88hZBwbNUIEfpqvuhjFaMAqMTWnA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/process": {
      "version": "0.11.10",
      "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",
      "integrity": "sha512-cdGef/drWFoydD1JsMzuFf8100nZl+GT+yacc2bEced5f9Rjk4z+WtFUTBu9PhOi9j/jfmBPu0mMEY4wIdAF8A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6.0"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/qs": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.15.0.tgz",
      "integrity": "sha512-mAZTtNCeetKMH+pSjrb76NAM8V9a05I9aBZOHztWy/UqcJdQYNsf59vrRKWnojAT9Y+GbIvoTBC++CPHqpDBhQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/readable-stream": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-4.7.0.tgz",
      "integrity": "sha512-oIGGmcpTLwPga8Bn6/Z75SVaH1z5dUut2ibSyAMVhmUggWpmDn2dapB0n7f8nwaSiRtepAsfJyfXIO5DCVAODg==",
      "license": "MIT",
      "dependencies": {
        "abort-controller": "^3.0.0",
        "buffer": "^6.0.3",
        "events": "^3.3.0",
        "process": "^0.11.10",
        "string_decoder": "^1.3.0"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      }
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/run-applescript": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/run-applescript/-/run-applescript-7.1.0.tgz",
      "integrity": "sha512-DPe5pVFaAsinSaV6QjQ6gdiedWDcRCbUuiQfQa2wmWV7+xC9bGulGI8+TdRmoFkAPaBXk8CrAbnlY2ISniJ47Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/sharp": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.34.5.tgz",
      "integrity": "sha512-Ou9I5Ft9WNcCbXrU9cMgPBcCK8LiwLqcbywW3t4oDV37n1pzpuNLsYiAV8eODnjbtQlSDwZ2cUEeQz4E54Hltg==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@img/colour": "^1.0.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.7.3"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.34.5",
        "@img/sharp-darwin-x64": "0.34.5",
        "@img/sharp-libvips-darwin-arm64": "1.2.4",
        "@img/sharp-libvips-darwin-x64": "1.2.4",
        "@img/sharp-libvips-linux-arm": "1.2.4",
        "@img/sharp-libvips-linux-arm64": "1.2.4",
        "@img/sharp-libvips-linux-ppc64": "1.2.4",
        "@img/sharp-libvips-linux-riscv64": "1.2.4",
        "@img/sharp-libvips-linux-s390x": "1.2.4",
        "@img/sharp-libvips-linux-x64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4",
        "@img/sharp-linux-arm": "0.34.5",
        "@img/sharp-linux-arm64": "0.34.5",
        "@img/sharp-linux-ppc64": "0.34.5",
        "@img/sharp-linux-riscv64": "0.34.5",
        "@img/sharp-linux-s390x": "0.34.5",
        "@img/sharp-linux-x64": "0.34.5",
        "@img/sharp-linuxmusl-arm64": "0.34.5",
        "@img/sharp-linuxmusl-x64": "0.34.5",
        "@img/sharp-wasm32": "0.34.5",
        "@img/sharp-win32-arm64": "0.34.5",
        "@img/sharp-win32-ia32": "0.34.5",
        "@img/sharp-win32-x64": "0.34.5"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/sprintf-js": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/sprintf-js/-/sprintf-js-1.1.3.tgz",
      "integrity": "sha512-Oo+0REFV59/rz3gfJNKQiBlwfHaSESl1pcGyABQsnnIfWOFt6JNj5gCog2U6MLZ//IGYD+nA8nI+mTShREReaA==",
      "license": "BSD-3-Clause"
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/tarn": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/tarn/-/tarn-3.0.2.tgz",
      "integrity": "sha512-51LAVKUSZSVfI05vjPESNc5vwqqZpbXCsU+/+wxlOrUjk2SnFTt97v9ZgQrD4YmxYW1Px6w2KjaDitCfkvgxMQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/tedious": {
      "version": "19.2.1",
      "resolved": "https://registry.npmjs.org/tedious/-/tedious-19.2.1.tgz",
      "integrity": "sha512-pk1Q16Yl62iocuQB+RWbg6rFUFkIyzqOFQ6NfysCltRvQqKwfurgj8v/f2X+CKvDhSL4IJ0cCOfCHDg9PWEEYA==",
      "license": "MIT",
      "dependencies": {
        "@azure/core-auth": "^1.7.2",
        "@azure/identity": "^4.2.1",
        "@azure/keyvault-keys": "^4.4.0",
        "@js-joda/core": "^5.6.5",
        "@types/node": ">=18",
        "bl": "^6.1.4",
        "iconv-lite": "^0.7.0",
        "js-md4": "^0.3.2",
        "native-duplexpair": "^1.0.0",
        "sprintf-js": "^1.1.3"
      },
      "engines": {
        "node": ">=18.17"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/type-is": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^1.0.5",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha512-/aCDEGatGvZ2BIk+HmLf4ifCJFwvKFNb9/JeZPMulfgFracn9QFcAf5GO8B/mweUjSoblS5In0cWhqpfs/5PQA==",
      "license": "MIT"
    },
    "node_modules/undici-types": {
      "version": "7.18.2",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.18.2.tgz",
      "integrity": "sha512-AsuCzffGHJybSaRrmr5eHr81mwJU3kjw6M+uprWvCXiNeN9SOGwQ3Jn8jb8m3Z6izVgknn1R0FTCEAP2QrLY/w==",
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/uuid": {
      "version": "8.3.2",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-8.3.2.tgz",
      "integrity": "sha512-+NYs2QeMWy+GWFOEm9xnn6HCDp0l7QBD7ml8zLUmJ+93Q5NF0NocErnwkTkXVFNiX3/fpC6afS8Dhb/gz7R7eg==",
      "license": "MIT",
      "bin": {
        "uuid": "dist/bin/uuid"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/wsl-utils": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/wsl-utils/-/wsl-utils-0.1.0.tgz",
      "integrity": "sha512-h3Fbisa2nKGPxCpm89Hk33lBLsnaGBvctQopaBSOW/uIs6FTe1ATyAnKFJrzVs9vpGdsTe73WF3V4lIsk4Gacw==",
      "license": "MIT",
      "dependencies": {
        "is-wsl": "^3.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    }
  }
}

```

## backend/package.json

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "mssql": "^12.2.0",
    "multer": "^2.1.1",
    "sharp": "^0.34.5"
  }
}

```

## backend/routes/agents.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all agents
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName, Contact, Location, CreatedAt
            FROM Agents
            ORDER BY AgentIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /agents failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single agent
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    AgentId, AgentName, Contact, Location, CreatedAt
                FROM Agents
                WHERE AgentId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /agents/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new agent
router.post('/', async (req, res) => {
    try {
        const { agentName, contact, location } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('agentName', sql.NVarChar, agentName)
            .input('contact', sql.NVarChar, contact)
            .input('location', sql.NVarChar, location)
            .query(`
                INSERT INTO Agents (AgentName, Contact, Location)
                OUTPUT INSERTED.AgentId, INSERTED.AgentName
                VALUES (@agentName, @contact, @location)
            `);

        console.log('✅ Agent added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /agents failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update agent
router.put('/:id', async (req, res) => {
    try {
        const { agentName, contact, location } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('agentName', sql.NVarChar, agentName)
            .input('contact', sql.NVarChar, contact)
            .input('location', sql.NVarChar, location)
            .query(`
                UPDATE Agents 
                SET AgentName = @agentName,
                    Contact = @contact,
                    Location = @location
                WHERE AgentId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json({ message: 'Agent updated successfully' });
    } catch (err) {
        console.error('❌ PUT /agents/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE agent
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Agents WHERE AgentId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Agent not found' });
        }
        res.json({ message: 'Agent deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /agents/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/deliveries.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all deliveries (with joined details)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                d.DeliveryId, d.BatchRef,
                d.FarmerId, f.FarmerName,
                d.MilkQuantity,
                d.QualityId, mq.Grade,
                d.RatePerLitre,
                d.FactoryId, fa.FactoryName,
                FORMAT(d.DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                d.Amount,
                d.CreatedAt
            FROM Deliveries d
            INNER JOIN Farmers f ON d.FarmerId = f.FarmerId
            INNER JOIN MilkQuality mq ON d.QualityId = mq.QualityId
            INNER JOIN Factories fa ON d.FactoryId = fa.FactoryId
            ORDER BY d.DeliveryIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /deliveries failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single delivery
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    d.DeliveryId, d.BatchRef,
                    d.FarmerId, f.FarmerName,
                    d.MilkQuantity,
                    d.QualityId, mq.Grade,
                    d.RatePerLitre,
                    d.FactoryId, fa.FactoryName,
                    FORMAT(d.DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                    d.Amount,
                    d.CreatedAt
                FROM Deliveries d
                INNER JOIN Farmers f ON d.FarmerId = f.FarmerId
                INNER JOIN MilkQuality mq ON d.QualityId = mq.QualityId
                INNER JOIN Factories fa ON d.FactoryId = fa.FactoryId
                WHERE d.DeliveryId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /deliveries/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET deliveries by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    d.DeliveryId, d.BatchRef,
                    d.FarmerId, f.FarmerName,
                    d.MilkQuantity,
                    d.QualityId, mq.Grade,
                    d.RatePerLitre,
                    d.FactoryId, fa.FactoryName,
                    FORMAT(d.DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                    d.Amount
                FROM Deliveries d
                INNER JOIN Farmers f ON d.FarmerId = f.FarmerId
                INNER JOIN MilkQuality mq ON d.QualityId = mq.QualityId
                INNER JOIN Factories fa ON d.FactoryId = fa.FactoryId
                WHERE d.FarmerId = @farmerId
                ORDER BY d.DeliveryDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /deliveries/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET rate for a quality grade (for auto-fill on frontend)
router.get('/rate/:qualityId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('qualityId', sql.VarChar, req.params.qualityId)
            .query(`
                SELECT PricePerLitre 
                FROM MilkQuality 
                WHERE QualityId = @qualityId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /deliveries/rate/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new delivery
router.post('/', async (req, res) => {
    try {
        const { farmerId, milkQuantity, qualityId, ratePerLitre, factoryId, deliveryDate } = req.body;

        if (!milkQuantity || milkQuantity <= 0) {
            return res.status(400).json({ error: 'Milk quantity must be greater than 0' });
        }
        if (!ratePerLitre || ratePerLitre <= 0) {
            return res.status(400).json({ error: 'Rate per litre must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, farmerId)
            .input('milkQuantity', sql.Decimal(10, 2), milkQuantity)
            .input('qualityId', sql.VarChar, qualityId)
            .input('ratePerLitre', sql.Decimal(10, 2), ratePerLitre)
            .input('factoryId', sql.VarChar, factoryId)
            .input('deliveryDate', sql.Date, deliveryDate)
            .query(`
                INSERT INTO Deliveries (FarmerId, MilkQuantity, QualityId, RatePerLitre, FactoryId, DeliveryDate)
                OUTPUT INSERTED.DeliveryId, INSERTED.BatchRef, INSERTED.FarmerId, INSERTED.Amount
                VALUES (@farmerId, @milkQuantity, @qualityId, @ratePerLitre, @factoryId, @deliveryDate)
            `);

        console.log('✅ Delivery added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /deliveries failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update delivery
router.put('/:id', async (req, res) => {
    try {
        const { farmerId, milkQuantity, qualityId, ratePerLitre, factoryId, deliveryDate } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerId', sql.VarChar, farmerId)
            .input('milkQuantity', sql.Decimal(10, 2), milkQuantity)
            .input('qualityId', sql.VarChar, qualityId)
            .input('ratePerLitre', sql.Decimal(10, 2), ratePerLitre)
            .input('factoryId', sql.VarChar, factoryId)
            .input('deliveryDate', sql.Date, deliveryDate)
            .query(`
                UPDATE Deliveries 
                SET FarmerId = @farmerId,
                    MilkQuantity = @milkQuantity,
                    QualityId = @qualityId,
                    RatePerLitre = @ratePerLitre,
                    FactoryId = @factoryId,
                    DeliveryDate = @deliveryDate
                WHERE DeliveryId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        res.json({ message: 'Delivery updated successfully' });
    } catch (err) {
        console.error('❌ PUT /deliveries/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE delivery
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Deliveries WHERE DeliveryId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Delivery not found' });
        }
        res.json({ message: 'Delivery deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /deliveries/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/factories.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all factories
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FactoryId, FactoryName, Location, Contact, CreatedAt
            FROM Factories
            ORDER BY FactoryIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /factories failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single factory
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    FactoryId, FactoryName, Location, Contact, CreatedAt
                FROM Factories
                WHERE FactoryId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Factory not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /factories/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new factory
router.post('/', async (req, res) => {
    try {
        const { factoryName, location, contact } = req.body;

        // Validate contact length
        if (!contact || contact.length !== 10) {
            return res.status(400).json({ error: 'Contact must be exactly 10 characters' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('factoryName', sql.NVarChar, factoryName)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                INSERT INTO Factories (FactoryName, Location, Contact)
                OUTPUT INSERTED.FactoryId, INSERTED.FactoryName
                VALUES (@factoryName, @location, @contact)
            `);

        console.log('✅ Factory added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /factories failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update factory
router.put('/:id', async (req, res) => {
    try {
        const { factoryName, location, contact } = req.body;

        if (!contact || contact.length !== 10) {
            return res.status(400).json({ error: 'Contact must be exactly 10 characters' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('factoryName', sql.NVarChar, factoryName)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                UPDATE Factories 
                SET FactoryName = @factoryName,
                    Location = @location,
                    Contact = @contact
                WHERE FactoryId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Factory not found' });
        }
        res.json({ message: 'Factory updated successfully' });
    } catch (err) {
        console.error('❌ PUT /factories/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE factory
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Factories WHERE FactoryId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Factory not found' });
        }
        res.json({ message: 'Factory deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /factories/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/farmers.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all farmers
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, DateOfBirth, Age,
                Gender, Email, Location, Contact,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ProfilePicUrl, CreatedAt
            FROM Farmers
            ORDER BY FarmerIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /farmers failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer by FarmerId
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    FarmerId, FarmerName, DateOfBirth, Age,
                    Gender, Email, Location, Contact,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    ProfilePicUrl, CreatedAt
                FROM Farmers
                WHERE FarmerId = @id
            `);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new farmer
router.post('/', async (req, res) => {
    try {
        const { farmerName, dateOfBirth, gender, email, location, contact } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerName', sql.NVarChar, farmerName)
            .input('dateOfBirth', sql.Date, dateOfBirth)
            .input('gender', sql.NVarChar, gender)
            .input('email', sql.NVarChar, email || null)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                INSERT INTO Farmers (FarmerName, DateOfBirth, Gender, Email, Location, Contact)
                OUTPUT INSERTED.FarmerId, INSERTED.FarmerName
                VALUES (@farmerName, @dateOfBirth, @gender, @email, @location, @contact)
            `);

        console.log('✅ Farmer added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /farmers failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update farmer
router.put('/:id', async (req, res) => {
    try {
        const { farmerName, dateOfBirth, gender, email, location, contact } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerName', sql.NVarChar, farmerName)
            .input('dateOfBirth', sql.Date, dateOfBirth)
            .input('gender', sql.NVarChar, gender)
            .input('email', sql.NVarChar, email || null)
            .input('location', sql.NVarChar, location)
            .input('contact', sql.NVarChar, contact)
            .query(`
                UPDATE Farmers 
                SET FarmerName = @farmerName,
                    DateOfBirth = @dateOfBirth,
                    Gender = @gender,
                    Email = @email,
                    Location = @location,
                    Contact = @contact
                WHERE FarmerId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer updated successfully' });
    } catch (err) {
        console.error('❌ PUT /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE farmer
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Farmers WHERE FarmerId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Farmer not found' });
        }
        res.json({ message: 'Farmer deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /farmers/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/inputPurchases.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all purchases (with joined details)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                ip.PurchaseId,
                ip.FarmerId, f.FarmerName,
                ip.InputId, ip.InputName, ip.InputPrice,
                ip.Quantity, ip.PurchaseAmount,
                FORMAT(ip.DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase,
                ip.CreatedAt
            FROM InputPurchases ip
            INNER JOIN Farmers f ON ip.FarmerId = f.FarmerId
            ORDER BY ip.PurchaseIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /input-purchases failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single purchase
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    ip.PurchaseId,
                    ip.FarmerId, f.FarmerName,
                    ip.InputId, ip.InputName, ip.InputPrice,
                    ip.Quantity, ip.PurchaseAmount,
                    FORMAT(ip.DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase,
                    ip.CreatedAt
                FROM InputPurchases ip
                INNER JOIN Farmers f ON ip.FarmerId = f.FarmerId
                WHERE ip.PurchaseId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /input-purchases/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET purchases by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    ip.PurchaseId,
                    ip.FarmerId, f.FarmerName,
                    ip.InputId, ip.InputName, ip.InputPrice,
                    ip.Quantity, ip.PurchaseAmount,
                    FORMAT(ip.DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase
                FROM InputPurchases ip
                INNER JOIN Farmers f ON ip.FarmerId = f.FarmerId
                WHERE ip.FarmerId = @farmerId
                ORDER BY ip.DateOfPurchase DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /input-purchases/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET input details for auto-fill (name + price)
router.get('/input-details/:inputId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('inputId', sql.VarChar, req.params.inputId)
            .query(`
                SELECT InputId, InputName, InputPrice 
                FROM Inputs 
                WHERE InputId = @inputId
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /input-purchases/input-details/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new purchase
router.post('/', async (req, res) => {
    try {
        const { farmerId, inputId, inputName, inputPrice, quantity, dateOfPurchase } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Quantity must be greater than 0' });
        }
        if (!inputPrice || inputPrice <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, farmerId)
            .input('inputId', sql.VarChar, inputId)
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .input('quantity', sql.Int, quantity)
            .input('dateOfPurchase', sql.Date, dateOfPurchase)
            .query(`
                INSERT INTO InputPurchases (FarmerId, InputId, InputName, InputPrice, Quantity, DateOfPurchase)
                OUTPUT INSERTED.PurchaseId, INSERTED.FarmerId, INSERTED.PurchaseAmount
                VALUES (@farmerId, @inputId, @inputName, @inputPrice, @quantity, @dateOfPurchase)
            `);

        console.log('✅ Purchase added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /input-purchases failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update purchase
router.put('/:id', async (req, res) => {
    try {
        const { farmerId, inputId, inputName, inputPrice, quantity, dateOfPurchase } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerId', sql.VarChar, farmerId)
            .input('inputId', sql.VarChar, inputId)
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .input('quantity', sql.Int, quantity)
            .input('dateOfPurchase', sql.Date, dateOfPurchase)
            .query(`
                UPDATE InputPurchases 
                SET FarmerId = @farmerId,
                    InputId = @inputId,
                    InputName = @inputName,
                    InputPrice = @inputPrice,
                    Quantity = @quantity,
                    DateOfPurchase = @dateOfPurchase
                WHERE PurchaseId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json({ message: 'Purchase updated successfully' });
    } catch (err) {
        console.error('❌ PUT /input-purchases/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE purchase
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM InputPurchases WHERE PurchaseId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Purchase not found' });
        }
        res.json({ message: 'Purchase deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /input-purchases/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/inputs.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all inputs
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                InputId, InputName, InputPrice, CreatedAt
            FROM Inputs
            ORDER BY InputIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /inputs failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single input
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    InputId, InputName, InputPrice, CreatedAt
                FROM Inputs
                WHERE InputId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /inputs/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new input
router.post('/', async (req, res) => {
    try {
        const { inputName, inputPrice } = req.body;

        if (!inputPrice || inputPrice <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .query(`
                INSERT INTO Inputs (InputName, InputPrice)
                OUTPUT INSERTED.InputId, INSERTED.InputName, INSERTED.InputPrice
                VALUES (@inputName, @inputPrice)
            `);

        console.log('✅ Input added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /inputs failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update input
router.put('/:id', async (req, res) => {
    try {
        const { inputName, inputPrice } = req.body;

        if (!inputPrice || inputPrice <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('inputName', sql.NVarChar, inputName)
            .input('inputPrice', sql.Decimal(10, 2), inputPrice)
            .query(`
                UPDATE Inputs 
                SET InputName = @inputName,
                    InputPrice = @inputPrice
                WHERE InputId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json({ message: 'Input updated successfully' });
    } catch (err) {
        console.error('❌ PUT /inputs/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE input
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Inputs WHERE InputId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Input not found' });
        }
        res.json({ message: 'Input deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /inputs/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/loans.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all loans (with farmer names)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                l.LoanId, l.FarmerId, f.FarmerName,
                l.LoanAmount, l.RepaymentPeriod,
                FORMAT(l.DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                l.CreatedAt
            FROM Loans l
            INNER JOIN Farmers f ON l.FarmerId = f.FarmerId
            ORDER BY l.LoanIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /loans failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single loan
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    l.LoanId, l.FarmerId, f.FarmerName,
                    l.LoanAmount, l.RepaymentPeriod,
                    FORMAT(l.DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                    l.CreatedAt
                FROM Loans l
                INNER JOIN Farmers f ON l.FarmerId = f.FarmerId
                WHERE l.LoanId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /loans/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET loans by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    l.LoanId, l.FarmerId, f.FarmerName,
                    l.LoanAmount, l.RepaymentPeriod,
                    FORMAT(l.DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                    l.CreatedAt
                FROM Loans l
                INNER JOIN Farmers f ON l.FarmerId = f.FarmerId
                WHERE l.FarmerId = @farmerId
                ORDER BY l.DateBorrowed DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /loans/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new loan
router.post('/', async (req, res) => {
    try {
        const { farmerId, loanAmount, repaymentPeriod, dateBorrowed } = req.body;

        if (!loanAmount || loanAmount <= 0) {
            return res.status(400).json({ error: 'Loan amount must be greater than 0' });
        }
        if (!repaymentPeriod || repaymentPeriod <= 0) {
            return res.status(400).json({ error: 'Repayment period must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, farmerId)
            .input('loanAmount', sql.Decimal(12, 2), loanAmount)
            .input('repaymentPeriod', sql.Int, repaymentPeriod)
            .input('dateBorrowed', sql.Date, dateBorrowed)
            .query(`
                INSERT INTO Loans (FarmerId, LoanAmount, RepaymentPeriod, DateBorrowed)
                OUTPUT INSERTED.LoanId, INSERTED.FarmerId, INSERTED.LoanAmount
                VALUES (@farmerId, @loanAmount, @repaymentPeriod, @dateBorrowed)
            `);

        console.log('✅ Loan added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /loans failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update loan
router.put('/:id', async (req, res) => {
    try {
        const { farmerId, loanAmount, repaymentPeriod, dateBorrowed } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('farmerId', sql.VarChar, farmerId)
            .input('loanAmount', sql.Decimal(12, 2), loanAmount)
            .input('repaymentPeriod', sql.Int, repaymentPeriod)
            .input('dateBorrowed', sql.Date, dateBorrowed)
            .query(`
                UPDATE Loans 
                SET FarmerId = @farmerId,
                    LoanAmount = @loanAmount,
                    RepaymentPeriod = @repaymentPeriod,
                    DateBorrowed = @dateBorrowed
                WHERE LoanId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json({ message: 'Loan updated successfully' });
    } catch (err) {
        console.error('❌ PUT /loans/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE loan
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Loans WHERE LoanId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        res.json({ message: 'Loan deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /loans/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/milkQuality.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all quality grades
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                QualityId, Grade, PricePerLitre, CreatedAt
            FROM MilkQuality
            ORDER BY QualityIdNum
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /milk-quality failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single grade
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT QualityId, Grade, PricePerLitre, CreatedAt
                FROM MilkQuality
                WHERE QualityId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /milk-quality/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new grade
router.post('/', async (req, res) => {
    try {
        const { grade, pricePerLitre } = req.body;

        if (!['A', 'AA', 'B'].includes(grade)) {
            return res.status(400).json({ error: 'Grade must be A, AA, or B' });
        }
        if (!pricePerLitre || pricePerLitre <= 0) {
            return res.status(400).json({ error: 'Price must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('grade', sql.NVarChar, grade)
            .input('pricePerLitre', sql.Decimal(10, 2), pricePerLitre)
            .query(`
                INSERT INTO MilkQuality (Grade, PricePerLitre)
                OUTPUT INSERTED.QualityId, INSERTED.Grade, INSERTED.PricePerLitre
                VALUES (@grade, @pricePerLitre)
            `);

        console.log('✅ Quality grade added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /milk-quality failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update grade price
router.put('/:id', async (req, res) => {
    try {
        const { grade, pricePerLitre } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('grade', sql.NVarChar, grade)
            .input('pricePerLitre', sql.Decimal(10, 2), pricePerLitre)
            .query(`
                UPDATE MilkQuality 
                SET Grade = @grade,
                    PricePerLitre = @pricePerLitre
                WHERE QualityId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json({ message: 'Quality grade updated successfully' });
    } catch (err) {
        console.error('❌ PUT /milk-quality/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE grade
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM MilkQuality WHERE QualityId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Quality grade not found' });
        }
        res.json({ message: 'Quality grade deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /milk-quality/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/reports/agentsCommission.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET all agents monthly commission
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName, AgentLocation, AgentContact,
                SaleMonth, SaleMonthDisplay, SaleYear, SaleMonthNum,
                TotalTransactions, UniqueFarmers,
                TotalSales, TotalCommission,
                AvgSaleAmount, MinSale, MaxSale
            FROM vw_AgentsCommissionMonthly
            ORDER BY AgentId ASC, SaleYear ASC, SaleMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET agent summary cards
router.get('/summary', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName, AgentLocation, AgentContact,
                TotalTransactions, UniqueFarmers, ActiveMonths,
                TotalSales, TotalCommission, AvgSaleAmount,
                FORMAT(FirstSaleDate, 'yyyy-MM-dd') AS FirstSaleDate,
                FORMAT(LastSaleDate, 'yyyy-MM-dd') AS LastSaleDate
            FROM vw_AgentsSummary
            ORDER BY TotalSales DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission/summary failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single agent detail
router.get('/agent/:agentId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('agentId', sql.VarChar, req.params.agentId)
            .query(`
                SELECT 
                    SaleId, SaleDate,
                    FORMAT(SaleDate, 'yyyy-MM-dd') AS SaleDateDisplay,
                    SaleMonthDisplay,
                    AgentId, AgentName,
                    FarmerId, FarmerName, FarmerLocation,
                    SaleAmount, Commission
                FROM vw_AgentSalesDetail
                WHERE AgentId = @agentId
                ORDER BY SaleDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission/agent/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly trend data (for charts)
router.get('/trends', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                AgentId, AgentName,
                SaleMonth, SaleMonthDisplay,
                TotalSales, TotalCommission, TotalTransactions
            FROM vw_AgentsCommissionMonthly
            ORDER BY AgentId, SaleYear, SaleMonthNum
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/agents-commission/trends failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/reports/deliveriesReport.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET monthly delivery report per farmer (zero records excluded)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                DeliveryYear, DeliveryMonthNum,
                DeliveryMonth, DeliveryMonthDisplay,
                TotalDeliveries, TotalLitres,
                AvgLitresPerDelivery, MinDelivery, MaxDelivery,
                TotalAmount, AvgAmountPerDelivery, AvgRatePerLitre,
                LitresGradeAA, LitresGradeA, LitresGradeB,
                AmountGradeAA, AmountGradeA, AmountGradeB,
                FactoriesSupplied,
                FORMAT(FirstDelivery, 'yyyy-MM-dd') AS FirstDelivery,
                FORMAT(LastDelivery, 'yyyy-MM-dd') AS LastDelivery
            FROM vw_FarmerMonthlyDeliveries
            WHERE TotalLitres > 0
            ORDER BY FarmerId ASC, DeliveryYear ASC, DeliveryMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET farmer delivery overview cards
router.get('/overview', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                TotalDeliveries, ActiveMonths,
                TotalLitres, TotalRevenue,
                AvgLitresPerDelivery, AvgRevenuePerDelivery,
                AvgMonthlyLitres, AvgMonthlyRevenue,
                PctGradeAA, PctGradeA, PctGradeB,
                BestSingleDelivery, SmallestDelivery,
                FORMAT(FirstEverDelivery, 'yyyy-MM-dd') AS FirstEverDelivery,
                FORMAT(MostRecentDelivery, 'yyyy-MM-dd') AS MostRecentDelivery
            FROM vw_FarmerDeliveryOverview
            ORDER BY TotalRevenue DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/overview failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly totals across all farmers (for charts)
router.get('/monthly-totals', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                DeliveryMonth, DeliveryMonthDisplay,
                DeliveryYear, DeliveryMonthNum,
                ActiveFarmers, TotalDeliveries,
                TotalLitres, TotalRevenue, AvgDeliverySize,
                TotalAA, TotalA, TotalB,
                FactoriesServed
            FROM vw_MonthlyDeliveryTotals
            ORDER BY DeliveryYear ASC, DeliveryMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/monthly-totals failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer monthly breakdown
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    DeliveryMonthDisplay,
                    DeliveryYear, DeliveryMonthNum,
                    TotalDeliveries, TotalLitres, TotalAmount,
                    AvgLitresPerDelivery, AvgRatePerLitre,
                    LitresGradeAA, LitresGradeA, LitresGradeB,
                    FORMAT(FirstDelivery, 'yyyy-MM-dd') AS FirstDelivery,
                    FORMAT(LastDelivery, 'yyyy-MM-dd') AS LastDelivery
                FROM vw_FarmerMonthlyDeliveries
                WHERE FarmerId = @farmerId AND TotalLitres > 0
                ORDER BY DeliveryYear ASC, DeliveryMonthNum ASC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET individual delivery records for a farmer
router.get('/farmer/:farmerId/details', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    DeliveryId, BatchRef,
                    FORMAT(DeliveryDate, 'yyyy-MM-dd') AS DeliveryDate,
                    DeliveryMonthDisplay,
                    MilkQuantity, Grade, RatePerLitre,
                    FactoryName, Amount
                FROM vw_DeliveryDetails
                WHERE FarmerId = @farmerId
                ORDER BY DeliveryDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/deliveries/farmer/:id/details failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/reports/farmersList.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET farmers list grouped by location
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, DateOfBirth, Age,
                Gender, Email, Contact, Location,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ProfilePicUrl
            FROM vw_FarmersList
            ORDER BY Location ASC, FarmerId DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmers-list failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET location summary stats
router.get('/summary', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                Location,
                COUNT(*) AS TotalFarmers,
                AVG(Age) AS AvgAge,
                SUM(CASE WHEN Gender = 'Male' THEN 1 ELSE 0 END) AS Males,
                SUM(CASE WHEN Gender = 'Female' THEN 1 ELSE 0 END) AS Females
            FROM vw_FarmersList
            GROUP BY Location
            ORDER BY TotalFarmers DESC, Location ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmers-list/summary failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/reports/farmerStatements.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET all farmers monthly statements
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                FarmerContact, FarmerEmail, ProfilePicUrl,
                Age, Gender,
                TxnMonth, TxnYear, TxnMonthNum, MonthDisplay,
                DeliveryCount, TotalLitres, DeliveryAmount,
                SaleCount, SalesAmount, CommissionDeduction,
                ActiveLoans, LoanDeduction,
                PurchaseCount, TotalItemsBought, InputsDeduction,
                TotalDeductions, NetPayment, PaymentStatus
            FROM vw_FarmerMonthlyStatement
            ORDER BY FarmerId ASC, TxnYear ASC, TxnMonthNum ASC
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer monthly statement
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    FarmerId, FarmerName, FarmerLocation,
                    FarmerContact, FarmerEmail, ProfilePicUrl,
                    Age, Gender,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    TxnMonth, TxnYear, TxnMonthNum, MonthDisplay,
                    DeliveryCount, TotalLitres, DeliveryAmount,
                    SaleCount, SalesAmount, CommissionDeduction,
                    ActiveLoans, LoanDeduction,
                    PurchaseCount, TotalItemsBought, InputsDeduction,
                    TotalDeductions, NetPayment, PaymentStatus
                FROM vw_FarmerMonthlyStatement
                WHERE FarmerId = @farmerId
                ORDER BY TxnYear ASC, TxnMonthNum ASC
                OPTION (MAXRECURSION 200)
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET lifetime earnings all farmers
router.get('/lifetime', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                FarmerContact, FarmerEmail, ProfilePicUrl,
                Age, Gender,
                FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                ActiveMonths, FirstActiveMonth, LastActiveMonth,
                LifetimeDeliveries, LifetimeLitres, LifetimeDeliveryAmount,
                LifetimeCommission, LifetimeLoanDeductions,
                LifetimeInputsPurchased, LifetimeTotalDeductions,
                LifetimeNetEarnings,
                AvgMonthlyDelivery, AvgMonthlyDeductions, AvgMonthlyNetPayment,
                BestMonthEarning, WorstMonthEarning,
                MonthsInDeficit, MonthsInCredit, MonthsAtZero,
                TotalDeficitAmount, MostRecentMonthPayment
            FROM vw_FarmerLifetimeEarnings
            ORDER BY LifetimeNetEarnings DESC
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/lifetime failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer lifetime + profile
router.get('/farmer/:farmerId/profile', async (req, res) => {
    try {
        const pool = await getConnection();

        // Part A: Lifetime Summary
        const lifetime = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    FarmerId, FarmerName, FarmerLocation,
                    FarmerContact, FarmerEmail, ProfilePicUrl,
                    Age, Gender,
                    FORMAT(EnrolmentDate, 'yyyy-MM-dd') AS EnrolmentDate,
                    ActiveMonths, FirstActiveMonth, LastActiveMonth,
                    LifetimeDeliveries, LifetimeLitres, LifetimeDeliveryAmount,
                    LifetimeCommission, LifetimeLoanDeductions,
                    LifetimeInputsPurchased, LifetimeTotalDeductions,
                    LifetimeNetEarnings,
                    AvgMonthlyDelivery, AvgMonthlyDeductions, AvgMonthlyNetPayment,
                    BestMonthEarning, WorstMonthEarning,
                    MonthsInDeficit, MonthsInCredit, MonthsAtZero,
                    TotalDeficitAmount, MostRecentMonthPayment
                FROM vw_FarmerLifetimeEarnings
                WHERE FarmerId = @farmerId
                OPTION (MAXRECURSION 200)
            `);

        // Part B: Monthly Breakdown
        const monthly = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    TxnMonth, MonthDisplay,
                    TxnYear, TxnMonthNum,
                    DeliveryCount, TotalLitres, DeliveryAmount,
                    SaleCount, SalesAmount, CommissionDeduction,
                    ActiveLoans, LoanDeduction,
                    PurchaseCount, TotalItemsBought, InputsDeduction,
                    TotalDeductions, NetPayment, PaymentStatus
                FROM vw_FarmerMonthlyStatement
                WHERE FarmerId = @farmerId
                ORDER BY TxnYear ASC, TxnMonthNum ASC
                OPTION (MAXRECURSION 200)
            `);

        if (lifetime.recordset.length === 0) {
            return res.status(404).json({ error: 'Farmer not found or has no transactions' });
        }

        res.json({
            profile: lifetime.recordset[0],
            monthlyStatements: monthly.recordset
        });
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/farmer/:id/profile failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly trend across all farmers (for dashboard charts)
router.get('/monthly-trends', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                TxnMonth, MonthDisplay, TxnYear, TxnMonthNum,
                COUNT(DISTINCT FarmerId) AS ActiveFarmers,
                SUM(DeliveryAmount) AS TotalDeliveries,
                SUM(CommissionDeduction) AS TotalCommission,
                SUM(LoanDeduction) AS TotalLoanDeductions,
                SUM(InputsDeduction) AS TotalInputs,
                SUM(TotalDeductions) AS TotalAllDeductions,
                SUM(NetPayment) AS TotalNetPayments,
                SUM(CASE WHEN PaymentStatus = 'Credit' THEN 1 ELSE 0 END) AS FarmersInCredit,
                SUM(CASE WHEN PaymentStatus = 'Deficit' THEN 1 ELSE 0 END) AS FarmersInDeficit,
                SUM(CASE WHEN PaymentStatus = 'Zero' THEN 1 ELSE 0 END) AS FarmersAtZero
            FROM vw_FarmerMonthlyStatement
            GROUP BY TxnMonth, MonthDisplay, TxnYear, TxnMonthNum
            ORDER BY TxnYear ASC, TxnMonthNum ASC
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/monthly-trends failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET society-wide summary (dashboard top cards)
router.get('/society-summary', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                COUNT(DISTINCT FarmerId) AS TotalFarmers,
                COUNT(DISTINCT TxnMonth) AS TotalMonths,
                SUM(DeliveryAmount) AS TotalDeliveryRevenue,
                SUM(CommissionDeduction) AS TotalCommissionPaid,
                SUM(LoanDeduction) AS TotalLoanCollected,
                SUM(InputsDeduction) AS TotalInputsSold,
                SUM(TotalDeductions) AS TotalDeductions,
                SUM(NetPayment) AS TotalDisbursed,
                AVG(NetPayment) AS AvgMonthlyPayment
            FROM vw_FarmerMonthlyStatement
            OPTION (MAXRECURSION 200)
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /reports/farmer-statements/society-summary failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/reports/loansReport.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET all loan details with interest calculations
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                LoanId, FarmerId, FarmerName, FarmerLocation,
                LoanAmount, RepaymentPeriod,
                FORMAT(DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                DateBorrowedDisplay, BorrowedMonthDisplay,
                BorrowedYear, BorrowedMonthNum,
                InterestAmount, TotalRepayable, MonthlyInstallment,
                FORMAT(DueDate, 'yyyy-MM-dd') AS DueDate,
                DueDateDisplay, LoanStatus,
                MonthsElapsed, MonthsRemaining,
                ExpectedPaidToDate, OutstandingBalance,
                InterestRatePA
            FROM vw_LoanDetails
            ORDER BY BorrowedYear ASC, BorrowedMonthNum ASC, LoanId ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly loan summary
router.get('/monthly', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                BorrowedYear, BorrowedMonthNum,
                BorrowedMonth, BorrowedMonthDisplay,
                TotalLoans, UniqueBorrowers,
                TotalPrincipal, AvgLoanAmount,
                SmallestLoan, LargestLoan,
                TotalInterest, TotalRepayable,
                AvgRepaymentMonths, ShortestTerm, LongestTerm,
                TotalMonthlyInstallments,
                ActiveLoans, CompletedLoans,
                TotalOutstanding
            FROM vw_MonthlyLoanSummary
            ORDER BY BorrowedYear ASC, BorrowedMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/monthly failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET farmer loan overview cards
router.get('/farmer-overview', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                TotalLoans, ActiveLoans, CompletedLoans,
                TotalBorrowed, TotalInterest, TotalRepayable,
                TotalExpectedPaid, TotalOutstanding,
                CurrentMonthlyObligation,
                AvgLoanSize, AvgRepaymentPeriod,
                FORMAT(FirstLoanDate, 'yyyy-MM-dd') AS FirstLoanDate,
                FORMAT(LatestLoanDate, 'yyyy-MM-dd') AS LatestLoanDate
            FROM vw_FarmerLoanOverview
            ORDER BY TotalOutstanding DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/farmer-overview failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET active loans only
router.get('/active', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                LoanId, FarmerId, FarmerName,
                LoanAmount, InterestAmount, TotalRepayable,
                MonthlyInstallment, RepaymentPeriod,
                MonthsElapsed, MonthsRemaining,
                CAST(
                    (MonthsElapsed * 100.0 / RepaymentPeriod) 
                AS DECIMAL(5,1)) AS ProgressPercent,
                DueDateDisplay,
                ExpectedPaidToDate, OutstandingBalance
            FROM vw_LoanDetails
            WHERE LoanStatus = 'Active'
            ORDER BY OutstandingBalance DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/active failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer loans
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    LoanId, FarmerId, FarmerName,
                    LoanAmount, RepaymentPeriod,
                    FORMAT(DateBorrowed, 'yyyy-MM-dd') AS DateBorrowed,
                    DateBorrowedDisplay,
                    InterestAmount, TotalRepayable, MonthlyInstallment,
                    DueDateDisplay, LoanStatus,
                    MonthsElapsed, MonthsRemaining,
                    ExpectedPaidToDate, OutstandingBalance,
                    InterestRatePA
                FROM vw_LoanDetails
                WHERE FarmerId = @farmerId
                ORDER BY DateBorrowed DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/loans/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET portfolio summary (dashboard cards)
router.get('/portfolio', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                COUNT(*) AS TotalLoans,
                SUM(CASE WHEN LoanStatus = 'Active' THEN 1 ELSE 0 END) AS ActiveLoans,
                SUM(CASE WHEN LoanStatus = 'Completed' THEN 1 ELSE 0 END) AS CompletedLoans,
                COUNT(DISTINCT FarmerId) AS TotalBorrowers,
                SUM(LoanAmount) AS TotalDisbursed,
                SUM(InterestAmount) AS TotalInterestEarned,
                SUM(TotalRepayable) AS TotalPortfolio,
                SUM(ExpectedPaidToDate) AS TotalCollected,
                SUM(OutstandingBalance) AS TotalOutstanding,
                AVG(LoanAmount) AS AvgLoanSize,
                AVG(RepaymentPeriod) AS AvgTerm
            FROM vw_LoanDetails
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /reports/loans/portfolio failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/reports/purchasesReport.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../../db');

// GET monthly purchase report per farmer
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                PurchaseYear, PurchaseMonthNum,
                PurchaseMonth, PurchaseMonthDisplay,
                TotalTransactions, UniqueInputs,
                TotalQuantity, TotalSpent,
                AvgTransactionAmount,
                SmallestPurchase, LargestPurchase,
                TopInput,
                FORMAT(FirstPurchase, 'yyyy-MM-dd') AS FirstPurchase,
                FORMAT(LastPurchase, 'yyyy-MM-dd') AS LastPurchase
            FROM vw_FarmerMonthlyPurchases
            WHERE TotalSpent > 0
            ORDER BY FarmerId ASC, PurchaseYear ASC, PurchaseMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET monthly totals across all farmers (for charts)
router.get('/monthly-totals', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                PurchaseMonth, PurchaseMonthDisplay,
                PurchaseYear, PurchaseMonthNum,
                TotalTransactions, ActiveBuyers, UniqueInputs,
                TotalQuantity, TotalSpent, AvgTransactionAmount,
                SpentOnFeeds, SpentOnChemicals,
                SpentOnMinerals, SpentOnSilage
            FROM vw_MonthlyPurchaseTotals
            ORDER BY PurchaseYear ASC, PurchaseMonthNum ASC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/monthly-totals failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET farmer purchase overview cards
router.get('/farmer-overview', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                FarmerId, FarmerName, FarmerLocation,
                TotalTransactions, UniqueInputsBought, ActiveMonths,
                TotalQuantity, TotalSpent,
                AvgTransactionAmount, AvgMonthlySpend,
                LargestSinglePurchase, SmallestSinglePurchase,
                FORMAT(FirstEverPurchase, 'yyyy-MM-dd') AS FirstEverPurchase,
                FORMAT(MostRecentPurchase, 'yyyy-MM-dd') AS MostRecentPurchase
            FROM vw_FarmerPurchaseOverview
            ORDER BY TotalSpent DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/farmer-overview failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET input popularity ranking
router.get('/popular-inputs', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                InputId, InputName, InputPrice,
                TimesPurchased, UniqueBuyers,
                TotalQuantitySold, TotalRevenue,
                AvgQuantityPerPurchase,
                MonthsActive, AvgMonthlyRevenue
            FROM vw_InputPopularity
            ORDER BY TotalRevenue DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/popular-inputs failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single farmer purchase history
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    PurchaseId,
                    FORMAT(DateOfPurchase, 'yyyy-MM-dd') AS DateOfPurchase,
                    PurchaseMonthDisplay,
                    InputId, InputName,
                    InputPrice, Quantity,
                    PurchaseAmount, PriceStatus
                FROM vw_PurchaseDetails
                WHERE FarmerId = @farmerId
                ORDER BY DateOfPurchase DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /reports/purchases/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET portfolio summary (dashboard cards)
router.get('/portfolio', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                COUNT(*) AS TotalTransactions,
                COUNT(DISTINCT FarmerId) AS TotalBuyers,
                COUNT(DISTINCT InputId) AS UniqueInputs,
                COUNT(DISTINCT PurchaseMonth) AS ActiveMonths,
                SUM(Quantity) AS TotalQuantity,
                SUM(PurchaseAmount) AS TotalRevenue,
                AVG(PurchaseAmount) AS AvgTransaction,
                MAX(PurchaseAmount) AS LargestPurchase,
                MIN(PurchaseAmount) AS SmallestPurchase
            FROM vw_PurchaseDetails
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /reports/purchases/portfolio failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/routes/sales.js

```js
const express = require('express');
const router = express.Router();
const { getConnection, sql } = require('../db');

// GET all sales (with joined details)
router.get('/', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                s.SaleId,
                FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                s.AgentId, a.AgentName,
                s.FarmerId, f.FarmerName,
                s.SaleAmount, s.Commission,
                s.CreatedAt
            FROM Sales s
            INNER JOIN Agents a ON s.AgentId = a.AgentId
            INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
            ORDER BY s.SaleIdNum DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /sales failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET single sale
router.get('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query(`
                SELECT 
                    s.SaleId,
                    FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                    s.AgentId, a.AgentName,
                    s.FarmerId, f.FarmerName,
                    s.SaleAmount, s.Commission,
                    s.CreatedAt
                FROM Sales s
                INNER JOIN Agents a ON s.AgentId = a.AgentId
                INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
                WHERE s.SaleId = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('❌ GET /sales/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET sales by agent
router.get('/agent/:agentId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('agentId', sql.VarChar, req.params.agentId)
            .query(`
                SELECT 
                    s.SaleId,
                    FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                    s.AgentId, a.AgentName,
                    s.FarmerId, f.FarmerName,
                    s.SaleAmount, s.Commission
                FROM Sales s
                INNER JOIN Agents a ON s.AgentId = a.AgentId
                INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
                WHERE s.AgentId = @agentId
                ORDER BY s.SaleDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /sales/agent/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// GET sales by farmer
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('farmerId', sql.VarChar, req.params.farmerId)
            .query(`
                SELECT 
                    s.SaleId,
                    FORMAT(s.SaleDate, 'yyyy-MM-dd') AS SaleDate,
                    s.AgentId, a.AgentName,
                    s.FarmerId, f.FarmerName,
                    s.SaleAmount, s.Commission
                FROM Sales s
                INNER JOIN Agents a ON s.AgentId = a.AgentId
                INNER JOIN Farmers f ON s.FarmerId = f.FarmerId
                WHERE s.FarmerId = @farmerId
                ORDER BY s.SaleDate DESC
            `);
        res.json(result.recordset);
    } catch (err) {
        console.error('❌ GET /sales/farmer/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST new sale
router.post('/', async (req, res) => {
    try {
        const { saleDate, agentId, farmerId, saleAmount } = req.body;

        if (!saleAmount || saleAmount <= 0) {
            return res.status(400).json({ error: 'Sale amount must be greater than 0' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('saleDate', sql.Date, saleDate)
            .input('agentId', sql.VarChar, agentId)
            .input('farmerId', sql.VarChar, farmerId)
            .input('saleAmount', sql.Decimal(12, 2), saleAmount)
            .query(`
                INSERT INTO Sales (SaleDate, AgentId, FarmerId, SaleAmount)
                OUTPUT INSERTED.SaleId, INSERTED.SaleAmount, INSERTED.Commission
                VALUES (@saleDate, @agentId, @farmerId, @saleAmount)
            `);

        console.log('✅ Sale added:', result.recordset[0]);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('❌ POST /sales failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// PUT update sale
router.put('/:id', async (req, res) => {
    try {
        const { saleDate, agentId, farmerId, saleAmount } = req.body;

        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .input('saleDate', sql.Date, saleDate)
            .input('agentId', sql.VarChar, agentId)
            .input('farmerId', sql.VarChar, farmerId)
            .input('saleAmount', sql.Decimal(12, 2), saleAmount)
            .query(`
                UPDATE Sales 
                SET SaleDate = @saleDate,
                    AgentId = @agentId,
                    FarmerId = @farmerId,
                    SaleAmount = @saleAmount
                WHERE SaleId = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json({ message: 'Sale updated successfully' });
    } catch (err) {
        console.error('❌ PUT /sales/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// DELETE sale
router.delete('/:id', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.VarChar, req.params.id)
            .query('DELETE FROM Sales WHERE SaleId = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Sale not found' });
        }
        res.json({ message: 'Sale deleted successfully' });
    } catch (err) {
        console.error('❌ DELETE /sales/:id failed:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
```

## backend/server.js

```js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getConnection } = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- CRUD ROUTES ----
const farmersRoute = require('./routes/farmers');
const agentsRoute = require('./routes/agents');
const factoriesRoute = require('./routes/factories');
const inputsRoute = require('./routes/inputs');
const milkQualityRoute = require('./routes/milkQuality');
const loansRoute = require('./routes/loans');
const deliveriesRoute = require('./routes/deliveries');
const inputPurchasesRoute = require('./routes/inputPurchases');
const salesRoute = require('./routes/sales');

// ---- REPORT ROUTES ----
const farmersListReport = require('./routes/reports/farmersList');
const agentsCommissionReport = require('./routes/reports/agentsCommission');
const deliveriesReportRoute = require('./routes/reports/deliveriesReport');
const loansReportRoute = require('./routes/reports/loansReport');
const purchasesReportRoute = require('./routes/reports/purchasesReport');
const farmerStatementsRoute = require('./routes/reports/farmerStatements');

// ---- REGISTER CRUD ROUTES ----
app.use('/api/farmers', farmersRoute);
app.use('/api/agents', agentsRoute);
app.use('/api/factories', factoriesRoute);
app.use('/api/inputs', inputsRoute);
app.use('/api/milk-quality', milkQualityRoute);
app.use('/api/loans', loansRoute);
app.use('/api/deliveries', deliveriesRoute);
app.use('/api/input-purchases', inputPurchasesRoute);
app.use('/api/sales', salesRoute);

// ---- REGISTER REPORT ROUTES ----
app.use('/api/reports/farmers-list', farmersListReport);
app.use('/api/reports/agents-commission', agentsCommissionReport);
app.use('/api/reports/deliveries', deliveriesReportRoute);
app.use('/api/reports/loans', loansReportRoute);
app.use('/api/reports/purchases', purchasesReportRoute);
app.use('/api/reports/farmer-statements', farmerStatementsRoute);

// Health check
app.get('/', (req, res) => {
    res.json({
        status: '🐄 DairySphereSociety API is running',
        crud: {
            farmers: '/api/farmers',
            agents: '/api/agents',
            factories: '/api/factories',
            inputs: '/api/inputs',
            milkQuality: '/api/milk-quality',
            loans: '/api/loans',
            deliveries: '/api/deliveries',
            inputPurchases: '/api/input-purchases',
            sales: '/api/sales'
        },
        reports: {
            farmersList: '/api/reports/farmers-list',
            agentsCommission: '/api/reports/agents-commission',
            deliveries: '/api/reports/deliveries',
            loans: '/api/reports/loans',
            purchases: '/api/reports/purchases',
            farmerStatements: '/api/reports/farmer-statements'
        }
    });
});

// Start server
async function startServer() {
    console.log('🚀 Starting DairySphereSociety API...\n');
    await getConnection();

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log('\n============= ALL SYSTEMS GO ==============');
        console.log(`🐄 API:              http://localhost:${PORT}`);
        console.log('');
        console.log('📋 CRUD ENDPOINTS:');
        console.log(`   👨‍🌾 Farmers:        /api/farmers`);
        console.log(`   🤝 Agents:         /api/agents`);
        console.log(`   🏭 Factories:      /api/factories`);
        console.log(`   📦 Inputs:         /api/inputs`);
        console.log(`   🥛 Milk Quality:   /api/milk-quality`);
        console.log(`   💰 Loans:          /api/loans`);
        console.log(`   🚚 Deliveries:     /api/deliveries`);
        console.log(`   🛒 Purchases:      /api/input-purchases`);
        console.log(`   💵 Sales:          /api/sales`);
        console.log('');
        console.log('📊 REPORT ENDPOINTS:');
        console.log(`   📋 Farmers List:   /api/reports/farmers-list`);
        console.log(`   🤝 Agent Comm:     /api/reports/agents-commission`);
        console.log(`   🚚 Deliveries:     /api/reports/deliveries`);
        console.log(`   💰 Loans:          /api/reports/loans`);
        console.log(`   🛒 Purchases:      /api/reports/purchases`);
        console.log(`   📄 Statements:     /api/reports/farmer-statements`);
        console.log('=============================================');
    });
}

startServer();
```

## backend/uploads/

*(Empty Directory)*

## frontend/eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

## frontend/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

## frontend/package-lock.json

```json
{
  "name": "frontend",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "frontend",
      "version": "0.0.0",
      "dependencies": {
        "@studio-freight/lenis": "^1.0.42",
        "gsap": "^3.14.2",
        "lucide-react": "^0.577.0",
        "react": "^19.2.4",
        "react-circular-progressbar": "^2.2.0",
        "react-dom": "^19.2.4",
        "react-router-dom": "^7.13.1",
        "recharts": "^3.8.0",
        "split-type": "^0.3.4"
      },
      "devDependencies": {
        "@eslint/js": "^9.39.4",
        "@types/node": "^24.12.0",
        "@types/react": "^19.2.14",
        "@types/react-dom": "^19.2.3",
        "@vitejs/plugin-react": "^6.0.0",
        "eslint": "^9.39.4",
        "eslint-plugin-react-hooks": "^7.0.1",
        "eslint-plugin-react-refresh": "^0.5.2",
        "globals": "^17.4.0",
        "typescript": "~5.9.3",
        "typescript-eslint": "^8.56.1",
        "vite": "^8.0.0"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.6.tgz",
      "integrity": "sha512-xOBvwq86HHdB7WUDTfKfT/Vuxh7gElQ+Sfti2Cy6yIWNW05P8iUslOVcZ4/sKbE+/jQaukQAdz/gf3724kYdqw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.0.tgz",
      "integrity": "sha512-IyDgFV5GeDUVX4YdF/3CPULtVGSXXMLh1xVIgdCgxApktqnQV0r7/8Nqthg+8YLGaAtdyIlo2qIdZrbCv4+7ww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.9.0.tgz",
      "integrity": "sha512-0DQ98G9ZQZOxfUcQn1waV2yS8aWdZ6kJMbYCJB3oUBecjWYO1fqJ+a1DRfPF3O5JEkwqwP1A9QEN/9mYm2Yd0w==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.0",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.9.0.tgz",
      "integrity": "sha512-QN75eB0IH2ywSpRpNddCRfQIhmJYBCJ1x5Lb3IscKAL8bMnVAKnRg8dCoXbHzVLLH7P38N2Z3mtulB7W0J0FKw==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.0.tgz",
      "integrity": "sha512-N10dEJNSsUx41Z6pZsXU8FjPjpBEplgH24sfkmITrBED1/U2Esum9F3lfLrMjKHHjmi557zQn7kR9R+XWXu5Rg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.5.tgz",
      "integrity": "sha512-4IlJx0X0qftVsN5E+/vGujTRIFtwuLbNsVUe7TO6zYPDR1O6nFwvwhIKEKSrl6dZchmYBITazxKoUYOjdtjlRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.1",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/eslintrc/node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.4.tgz",
      "integrity": "sha512-nE7DEIchvtiFTwBw4Lfbu59PG+kCofhjsKaCWzxTpt4lfRjRMqG6uMBzKXuEcyXhOHoUp9riAm7/aWYGhXZ9cw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.1.tgz",
      "integrity": "sha512-p64ah1M1ld8xjWv3qbvFwHiFVWrq1yFvV4f7w+mzaqiR4IlSgkqhcRdHwsGgomwzBH51sRY4NEowLxnaBjcW/A==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1",
        "@tybys/wasm-util": "^0.10.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      }
    },
    "node_modules/@oxc-project/runtime": {
      "version": "0.115.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/runtime/-/runtime-0.115.0.tgz",
      "integrity": "sha512-Rg8Wlt5dCbXhQnsXPrkOjL1DTSvXLgb2R/KYfnf1/K+R0k6UMLEmbQXPM+kwrWqSmWA2t0B1EtHy2/3zikQpvQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@oxc-project/types": {
      "version": "0.115.0",
      "resolved": "https://registry.npmjs.org/@oxc-project/types/-/types-0.115.0.tgz",
      "integrity": "sha512-4n91DKnebUS4yjUHl2g3/b2T+IUdCfmoZGhmwsovZCDaJSs+QkVAM+0AqqTxHSsHfeiMuueT75cZaZcT/m0pSw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Boshen"
      }
    },
    "node_modules/@reduxjs/toolkit": {
      "version": "2.11.2",
      "resolved": "https://registry.npmjs.org/@reduxjs/toolkit/-/toolkit-2.11.2.tgz",
      "integrity": "sha512-Kd6kAHTA6/nUpp8mySPqj3en3dm0tdMIgbttnQ1xFMVpufoj+ADi8pXLBsd4xzTRHQa7t/Jv8W5UnCuW4kuWMQ==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.0.0",
        "@standard-schema/utils": "^0.3.0",
        "immer": "^11.0.0",
        "redux": "^5.0.1",
        "redux-thunk": "^3.1.0",
        "reselect": "^5.1.0"
      },
      "peerDependencies": {
        "react": "^16.9.0 || ^17.0.0 || ^18 || ^19",
        "react-redux": "^7.2.1 || ^8.1.3 || ^9.0.0"
      },
      "peerDependenciesMeta": {
        "react": {
          "optional": true
        },
        "react-redux": {
          "optional": true
        }
      }
    },
    "node_modules/@reduxjs/toolkit/node_modules/immer": {
      "version": "11.1.4",
      "resolved": "https://registry.npmjs.org/immer/-/immer-11.1.4.tgz",
      "integrity": "sha512-XREFCPo6ksxVzP4E0ekD5aMdf8WMwmdNaz6vuvxgI40UaEiu6q3p8X52aU6GdyvLY3XXX/8R7JOTXStz/nBbRw==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/immer"
      }
    },
    "node_modules/@rolldown/binding-android-arm64": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-android-arm64/-/binding-android-arm64-1.0.0-rc.9.tgz",
      "integrity": "sha512-lcJL0bN5hpgJfSIz/8PIf02irmyL43P+j1pTCfbD1DbLkmGRuFIA4DD3B3ZOvGqG0XiVvRznbKtN0COQVaKUTg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-arm64": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-arm64/-/binding-darwin-arm64-1.0.0-rc.9.tgz",
      "integrity": "sha512-J7Zk3kLYFsLtuH6U+F4pS2sYVzac0qkjcO5QxHS7OS7yZu2LRs+IXo+uvJ/mvpyUljDJ3LROZPoQfgBIpCMhdQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-darwin-x64": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-darwin-x64/-/binding-darwin-x64-1.0.0-rc.9.tgz",
      "integrity": "sha512-iwtmmghy8nhfRGeNAIltcNXzD0QMNaaA5U/NyZc1Ia4bxrzFByNMDoppoC+hl7cDiUq5/1CnFthpT9n+UtfFyg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-freebsd-x64": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-freebsd-x64/-/binding-freebsd-x64-1.0.0-rc.9.tgz",
      "integrity": "sha512-DLFYI78SCiZr5VvdEplsVC2Vx53lnA4/Ga5C65iyldMVaErr86aiqCoNBLl92PXPfDtUYjUh+xFFor40ueNs4Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm-gnueabihf": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm-gnueabihf/-/binding-linux-arm-gnueabihf-1.0.0-rc.9.tgz",
      "integrity": "sha512-CsjTmTwd0Hri6iTw/DRMK7kOZ7FwAkrO4h8YWKoX/kcj833e4coqo2wzIFywtch/8Eb5enQ/lwLM7w6JX1W5RQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-gnu": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-gnu/-/binding-linux-arm64-gnu-1.0.0-rc.9.tgz",
      "integrity": "sha512-2x9O2JbSPxpxMDhP9Z74mahAStibTlrBMW0520+epJH5sac7/LwZW5Bmg/E6CXuEF53JJFW509uP+lSedaUNxg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-arm64-musl": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-arm64-musl/-/binding-linux-arm64-musl-1.0.0-rc.9.tgz",
      "integrity": "sha512-JA1QRW31ogheAIRhIg9tjMfsYbglXXYGNPLdPEYrwFxdbkQCAzvpSCSHCDWNl4hTtrol8WeboCSEpjdZK8qrCg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-ppc64-gnu": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-ppc64-gnu/-/binding-linux-ppc64-gnu-1.0.0-rc.9.tgz",
      "integrity": "sha512-aOKU9dJheda8Kj8Y3w9gnt9QFOO+qKPAl8SWd7JPHP+Cu0EuDAE5wokQubLzIDQWg2myXq2XhTpOVS07qqvT+w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-s390x-gnu": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-s390x-gnu/-/binding-linux-s390x-gnu-1.0.0-rc.9.tgz",
      "integrity": "sha512-OalO94fqj7IWRn3VdXWty75jC5dk4C197AWEuMhIpvVv2lw9fiPhud0+bW2ctCxb3YoBZor71QHbY+9/WToadA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-gnu": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-gnu/-/binding-linux-x64-gnu-1.0.0-rc.9.tgz",
      "integrity": "sha512-cVEl1vZtBsBZna3YMjGXNvnYYrOJ7RzuWvZU0ffvJUexWkukMaDuGhUXn0rjnV0ptzGVkvc+vW9Yqy6h8YX4pg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-linux-x64-musl": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-linux-x64-musl/-/binding-linux-x64-musl-1.0.0-rc.9.tgz",
      "integrity": "sha512-UzYnKCIIc4heAKgI4PZ3dfBGUZefGCJ1TPDuLHoCzgrMYPb5Rv6TLFuYtyM4rWyHM7hymNdsg5ik2C+UD9VDbA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-openharmony-arm64": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-openharmony-arm64/-/binding-openharmony-arm64-1.0.0-rc.9.tgz",
      "integrity": "sha512-+6zoiF+RRyf5cdlFQP7nm58mq7+/2PFaY2DNQeD4B87N36JzfF/l9mdBkkmTvSYcYPE8tMh/o3cRlsx1ldLfog==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-wasm32-wasi": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-wasm32-wasi/-/binding-wasm32-wasi-1.0.0-rc.9.tgz",
      "integrity": "sha512-rgFN6sA/dyebil3YTlL2evvi/M+ivhfnyxec7AccTpRPccno/rPoNlqybEZQBkcbZu8Hy+eqNJCqfBR8P7Pg8g==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@napi-rs/wasm-runtime": "^1.1.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@rolldown/binding-win32-arm64-msvc": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-arm64-msvc/-/binding-win32-arm64-msvc-1.0.0-rc.9.tgz",
      "integrity": "sha512-lHVNUG/8nlF1IQk1C0Ci574qKYyty2goMiPlRqkC5R+3LkXDkL5Dhx8ytbxq35m+pkHVIvIxviD+TWLdfeuadA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/binding-win32-x64-msvc": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/binding-win32-x64-msvc/-/binding-win32-x64-msvc-1.0.0-rc.9.tgz",
      "integrity": "sha512-G0oA4+w1iY5AGi5HcDTxWsoxF509hrFIPB2rduV5aDqS9FtDg1CAfa7V34qImbjfhIcA8C+RekocJZA96EarwQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.7",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.7.tgz",
      "integrity": "sha512-qujRfC8sFVInYSPPMLQByRh7zhwkGFS4+tyMQ83srV1qrxL4g8E2tyxVVyxd0+8QeBM1mIk9KbWxkegRr76XzA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@standard-schema/utils": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/utils/-/utils-0.3.0.tgz",
      "integrity": "sha512-e7Mew686owMaPJVNNLs55PUvgz371nKgwsc4vxE49zsODpJEnxgxRo2y/OKrqueavXgZNMDVj3DdHFlaSAeU8g==",
      "license": "MIT"
    },
    "node_modules/@studio-freight/lenis": {
      "version": "1.0.42",
      "resolved": "https://registry.npmjs.org/@studio-freight/lenis/-/lenis-1.0.42.tgz",
      "integrity": "sha512-HJAGf2DeM+BTvKzHv752z6Z7zy6bA643nZM7W88Ft9tnw2GsJSp6iJ+3cekjyMIWH+cloL2U9X82dKXgdU8kPg==",
      "deprecated": "The '@studio-freight/lenis' package has been renamed to 'lenis'. Please update your dependencies: npm install lenis and visit the documentation: https://www.npmjs.com/package/lenis",
      "license": "MIT"
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
      "integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/d3-array": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/@types/d3-array/-/d3-array-3.2.2.tgz",
      "integrity": "sha512-hOLWVbm7uRza0BYXpIIW5pxfrKe0W+D5lrFiAEYR+pb6w3N2SwSMaJbXdUfSEv+dT4MfHBLtn5js0LAWaO6otw==",
      "license": "MIT"
    },
    "node_modules/@types/d3-color": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/@types/d3-color/-/d3-color-3.1.3.tgz",
      "integrity": "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==",
      "license": "MIT"
    },
    "node_modules/@types/d3-ease": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-ease/-/d3-ease-3.0.2.tgz",
      "integrity": "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==",
      "license": "MIT"
    },
    "node_modules/@types/d3-interpolate": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-interpolate/-/d3-interpolate-3.0.4.tgz",
      "integrity": "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-color": "*"
      }
    },
    "node_modules/@types/d3-path": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/@types/d3-path/-/d3-path-3.1.1.tgz",
      "integrity": "sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==",
      "license": "MIT"
    },
    "node_modules/@types/d3-scale": {
      "version": "4.0.9",
      "resolved": "https://registry.npmjs.org/@types/d3-scale/-/d3-scale-4.0.9.tgz",
      "integrity": "sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-time": "*"
      }
    },
    "node_modules/@types/d3-shape": {
      "version": "3.1.8",
      "resolved": "https://registry.npmjs.org/@types/d3-shape/-/d3-shape-3.1.8.tgz",
      "integrity": "sha512-lae0iWfcDeR7qt7rA88BNiqdvPS5pFVPpo5OfjElwNaT2yyekbM0C9vK+yqBqEmHr6lDkRnYNoTBYlAgJa7a4w==",
      "license": "MIT",
      "dependencies": {
        "@types/d3-path": "*"
      }
    },
    "node_modules/@types/d3-time": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@types/d3-time/-/d3-time-3.0.4.tgz",
      "integrity": "sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==",
      "license": "MIT"
    },
    "node_modules/@types/d3-timer": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/@types/d3-timer/-/d3-timer-3.0.2.tgz",
      "integrity": "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==",
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "24.12.0",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-24.12.0.tgz",
      "integrity": "sha512-GYDxsZi3ChgmckRT9HPU0WEhKLP08ev/Yfcq2AstjrDASOYCSXeyjDsHg4v5t4jOj7cyDX3vmprafKlWIG9MXQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.16.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/use-sync-external-store": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/@types/use-sync-external-store/-/use-sync-external-store-0.0.6.tgz",
      "integrity": "sha512-zFDAD+tlpf2r4asuHEj0XH6pY6i0g5NeAHPn+15wk3BV6JA69eERFXC1gyGThDkVa1zCyKr5jox1+2LbV/AMLg==",
      "license": "MIT"
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.57.0.tgz",
      "integrity": "sha512-qeu4rTHR3/IaFORbD16gmjq9+rEs9fGKdX0kF6BKSfi+gCuG3RCKLlSBYzn/bGsY9Tj7KE/DAQStbp8AHJGHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.57.0",
        "@typescript-eslint/type-utils": "8.57.0",
        "@typescript-eslint/utils": "8.57.0",
        "@typescript-eslint/visitor-keys": "8.57.0",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.4.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.57.0",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
      "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.57.0.tgz",
      "integrity": "sha512-XZzOmihLIr8AD1b9hL9ccNMzEMWt/dE2u7NyTY9jJG6YNiNthaD5XtUHVF2uCXZ15ng+z2hT3MVuxnUYhq6k1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.57.0",
        "@typescript-eslint/types": "8.57.0",
        "@typescript-eslint/typescript-estree": "8.57.0",
        "@typescript-eslint/visitor-keys": "8.57.0",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.57.0.tgz",
      "integrity": "sha512-pR+dK0BlxCLxtWfaKQWtYr7MhKmzqZxuii+ZjuFlZlIGRZm22HnXFqa2eY+90MUz8/i80YJmzFGDUsi8dMOV5w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.57.0",
        "@typescript-eslint/types": "^8.57.0",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.57.0.tgz",
      "integrity": "sha512-nvExQqAHF01lUM66MskSaZulpPL5pgy5hI5RfrxviLgzZVffB5yYzw27uK/ft8QnKXI2X0LBrHJFr1TaZtAibw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.57.0",
        "@typescript-eslint/visitor-keys": "8.57.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.57.0.tgz",
      "integrity": "sha512-LtXRihc5ytjJIQEH+xqjB0+YgsV4/tW35XKX3GTZHpWtcC8SPkT/d4tqdf1cKtesryHm2bgp6l555NYcT2NLvA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.57.0.tgz",
      "integrity": "sha512-yjgh7gmDcJ1+TcEg8x3uWQmn8ifvSupnPfjP21twPKrDP/pTHlEQgmKcitzF/rzPSmv7QjJ90vRpN4U+zoUjwQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.57.0",
        "@typescript-eslint/typescript-estree": "8.57.0",
        "@typescript-eslint/utils": "8.57.0",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.4.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.57.0.tgz",
      "integrity": "sha512-dTLI8PEXhjUC7B9Kre+u0XznO696BhXcTlOn0/6kf1fHaQW8+VjJAVHJ3eTI14ZapTxdkOmc80HblPQLaEeJdg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.57.0.tgz",
      "integrity": "sha512-m7faHcyVg0BT3VdYTlX8GdJEM7COexXxS6KqGopxdtkQRvBanK377QDHr4W/vIPAR+ah9+B/RclSW5ldVniO1Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.57.0",
        "@typescript-eslint/tsconfig-utils": "8.57.0",
        "@typescript-eslint/types": "8.57.0",
        "@typescript-eslint/visitor-keys": "8.57.0",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.4.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.4.tgz",
      "integrity": "sha512-h+DEnpVvxmfVefa4jFbCf5HdH5YMDXRsmKflpf1pILZWRFlTbJpxeU55nJl4Smt5HQaGzg1o6RHFPJaOqnmBDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "10.2.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.4.tgz",
      "integrity": "sha512-oRjTw/97aTBN0RHbYCdtF1MQfvusSIBQM0IZEgzl6426+8jSC0nF1a/GmnVLpfB9yyr6g6FTqWqiZVbxrtaCIg==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.57.0.tgz",
      "integrity": "sha512-5iIHvpD3CZe06riAsbNxxreP+MuYgVUsV0n4bwLH//VJmgtt54sQeY2GszntJ4BjYCpMzrfVh2SBnUQTtys2lQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.57.0",
        "@typescript-eslint/types": "8.57.0",
        "@typescript-eslint/typescript-estree": "8.57.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.57.0.tgz",
      "integrity": "sha512-zm6xx8UT/Xy2oSr2ZXD0pZo7Jx2XsCoID2IUh9YSTFRu7z+WdwYTRk6LhUftm1crwqbuoF6I8zAFeCMw0YjwDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.57.0",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-6.0.1.tgz",
      "integrity": "sha512-l9X/E3cDb+xY3SWzlG1MOGt2usfEHGMNIaegaUGFsLkb3RCn/k8/TOXBcab+OndDI4TBtktT8/9BwwW8Vi9KUQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rolldown/pluginutils": "1.0.0-rc.7"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "@rolldown/plugin-babel": "^0.1.7 || ^0.2.0",
        "babel-plugin-react-compiler": "^1.0.0",
        "vite": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "@rolldown/plugin-babel": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        }
      }
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/ajv": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
      "integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "dev": true,
      "license": "Python-2.0"
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.8",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.8.tgz",
      "integrity": "sha512-PCLz/LXGBsNTErbtB6i5u4eLpHeMfi93aUv5duMmj6caNu6IphS4q6UevDnL36sZQv9lrP11dbPKGMaXPwMKfQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.1",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.1.tgz",
      "integrity": "sha512-ZC5Bd0LgJXgwGqUknZY/vkUQ04r8NXnJZ3yYi4vDmSiZmC/pdSN0NbNRPxZpbtO4uAfDUAFffO8IZoM3Gj8IkA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.9.0",
        "caniuse-lite": "^1.0.30001759",
        "electron-to-chromium": "^1.5.263",
        "node-releases": "^2.0.27",
        "update-browserslist-db": "^1.2.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001779",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001779.tgz",
      "integrity": "sha512-U5og2PN7V4DMgF50YPNtnZJGWVLFjjsN3zb6uMT5VGYIewieDj1upwfuVNXf4Kor+89c3iCRJnSzMD5LmTvsfA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/d3-array": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/d3-array/-/d3-array-3.2.4.tgz",
      "integrity": "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==",
      "license": "ISC",
      "dependencies": {
        "internmap": "1 - 2"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-color": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-color/-/d3-color-3.1.0.tgz",
      "integrity": "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-ease": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-ease/-/d3-ease-3.0.1.tgz",
      "integrity": "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-format": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/d3-format/-/d3-format-3.1.2.tgz",
      "integrity": "sha512-AJDdYOdnyRDV5b6ArilzCPPwc1ejkHcoyFarqlPqT7zRYjhavcT3uSrqcMvsgh2CgoPbK3RCwyHaVyxYcP2Arg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-interpolate": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-interpolate/-/d3-interpolate-3.0.1.tgz",
      "integrity": "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==",
      "license": "ISC",
      "dependencies": {
        "d3-color": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-path": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-path/-/d3-path-3.1.0.tgz",
      "integrity": "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-scale": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/d3-scale/-/d3-scale-4.0.2.tgz",
      "integrity": "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2.10.0 - 3",
        "d3-format": "1 - 3",
        "d3-interpolate": "1.2.0 - 3",
        "d3-time": "2.1.1 - 3",
        "d3-time-format": "2 - 4"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-shape": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/d3-shape/-/d3-shape-3.2.0.tgz",
      "integrity": "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==",
      "license": "ISC",
      "dependencies": {
        "d3-path": "^3.1.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/d3-time/-/d3-time-3.1.0.tgz",
      "integrity": "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==",
      "license": "ISC",
      "dependencies": {
        "d3-array": "2 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-time-format": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/d3-time-format/-/d3-time-format-4.1.0.tgz",
      "integrity": "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==",
      "license": "ISC",
      "dependencies": {
        "d3-time": "1 - 3"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/d3-timer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/d3-timer/-/d3-timer-3.0.1.tgz",
      "integrity": "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js-light": {
      "version": "2.5.1",
      "resolved": "https://registry.npmjs.org/decimal.js-light/-/decimal.js-light-2.5.1.tgz",
      "integrity": "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==",
      "license": "MIT"
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.313",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.313.tgz",
      "integrity": "sha512-QBMrTWEf00GXZmJyx2lbYD45jpI3TUFnNIzJ5BBc8piGUDwMPa1GV6HJWTZVvY/eiN3fSopl7NRbgGp9sZ9LTA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/es-toolkit": {
      "version": "1.45.1",
      "resolved": "https://registry.npmjs.org/es-toolkit/-/es-toolkit-1.45.1.tgz",
      "integrity": "sha512-/jhoOj/Fx+A+IIyDNOvO3TItGmlMKhtX8ISAHKE90c4b/k1tqaqEZ+uUqfpU8DMnW5cgNJv606zS55jGvza0Xw==",
      "license": "MIT",
      "workspaces": [
        "docs",
        "benchmarks"
      ]
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.4.tgz",
      "integrity": "sha512-XoMjdBOwe/esVgEvLmNsD3IRHkm7fbKIUGvrleloJXUZgDHig2IPWNniv+GwjyJXzuNqVjlr5+4yVUZjycJwfQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.5",
        "@eslint/js": "9.39.4",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.0.1.tgz",
      "integrity": "sha512-O0d0m04evaNzEPoSW+59Mezf8Qt0InfgGIBJnpC0h3NH/WjUAR7BIKUfysC6todmtiZ/A0oUVS8Gce0WhBrHsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react-refresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-refresh/-/eslint-plugin-react-refresh-0.5.2.tgz",
      "integrity": "sha512-hmgTH57GfzoTFjVN0yBwTggnsVUF2tcqi7RJZHqi9lIezSs4eFyAMktA68YD4r5kNw1mxyY4dmkyoFDb3FIqrA==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "eslint": "^9 || ^10"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/eventemitter3": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/eventemitter3/-/eventemitter3-5.0.4.tgz",
      "integrity": "sha512-mlsTRyGaPBjPedk6Bvw+aqbsXDtoAyAzm5MO7JgU+yVRyMQ5O8bD4Kcci7BS85f93veegeCPkL8R4GLClnjLFw==",
      "license": "MIT"
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "17.4.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-17.4.0.tgz",
      "integrity": "sha512-hjrNztw/VajQwOLsMNT1cbJiH2muO3OROCHnbehc8eY5JyD2gqz4AcMHPqgaOR59DjgUjYAYLeH699g/eWi2jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/gsap": {
      "version": "3.14.2",
      "resolved": "https://registry.npmjs.org/gsap/-/gsap-3.14.2.tgz",
      "integrity": "sha512-P8/mMxVLU7o4+55+1TCnQrPmgjPKnwkzkXOK1asnR9Jg2lna4tEY5qBJjMmAaOBDDZWtlRjBXjLa0w53G/uBLA==",
      "license": "Standard 'no charge' license: https://gsap.com/standard-license."
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/immer": {
      "version": "10.2.0",
      "resolved": "https://registry.npmjs.org/immer/-/immer-10.2.0.tgz",
      "integrity": "sha512-d/+XTN3zfODyjr89gM3mPq1WNX2B8pYsu7eORitdwyA2sBubnTl3laYlBk4sXY5FUa5qTZGBDPJICVbvqzjlbw==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/immer"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/internmap": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/internmap/-/internmap-2.0.3.tgz",
      "integrity": "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.577.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.577.0.tgz",
      "integrity": "sha512-4LjoFv2eEPwYDPg/CUdBJQSDfPyzXCRrVW1X7jrx/trgxnxkHFjnVZINbzvzxjN70dxychOfg+FTYwBiS3pQ5A==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/node-releases": {
      "version": "2.0.36",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.36.tgz",
      "integrity": "sha512-TdC8FSgHz8Mwtw9g5L4gR/Sh9XhSP/0DEkQxfEFXOpiul5IiHgHan2VhYYb6agDSfp4KuvltmGApc8HMgUrIkA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.8",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.8.tgz",
      "integrity": "sha512-OW/rX8O/jXnm82Ey1k44pObPtdblfiuWnrd8X7GJ7emImCOstunGbXUpp7HdBrFQX6rJzn3sPT397Wp5aCwCHg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/react": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.4.tgz",
      "integrity": "sha512-9nfp2hYpCwOjAN+8TZFGhtWEwgvWHXqESH8qT89AT/lWklpLON22Lc8pEtnpsZz7VmawabSU0gCjnj8aC0euHQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-circular-progressbar": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/react-circular-progressbar/-/react-circular-progressbar-2.2.0.tgz",
      "integrity": "sha512-cgyqEHOzB0nWMZjKfWN3MfSa1LV3OatcDjPz68lchXQUEiBD5O1WsAtoVK4/DSL0B4USR//cTdok4zCBkq8X5g==",
      "license": "MIT",
      "peerDependencies": {
        "react": ">=0.14.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.4.tgz",
      "integrity": "sha512-AXJdLo8kgMbimY95O2aKQqsz2iWi9jMgKJhRBAxECE4IFxfcazB2LmzloIoibJI3C12IlY20+KFaLv+71bUJeQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.4"
      }
    },
    "node_modules/react-is": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-19.2.4.tgz",
      "integrity": "sha512-W+EWGn2v0ApPKgKKCy/7s7WHXkboGcsrXE+2joLyVxkbyVQfO3MUEaUQDHoSmb8TFFrSKYa9mw64WZHNHSDzYA==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/react-redux": {
      "version": "9.2.0",
      "resolved": "https://registry.npmjs.org/react-redux/-/react-redux-9.2.0.tgz",
      "integrity": "sha512-ROY9fvHhwOD9ySfrF0wmvu//bKCQ6AeZZq1nJNtbDC+kk5DuSuNX/n6YWYF/SYy7bSba4D4FSz8DJeKY/S/r+g==",
      "license": "MIT",
      "dependencies": {
        "@types/use-sync-external-store": "^0.0.6",
        "use-sync-external-store": "^1.4.0"
      },
      "peerDependencies": {
        "@types/react": "^18.2.25 || ^19",
        "react": "^18.0 || ^19",
        "redux": "^5.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "redux": {
          "optional": true
        }
      }
    },
    "node_modules/react-router": {
      "version": "7.13.1",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.13.1.tgz",
      "integrity": "sha512-td+xP4X2/6BJvZoX6xw++A2DdEi++YypA69bJUV5oVvqf6/9/9nNlD70YO1e9d3MyamJEBQFEzk6mbfDYbqrSA==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.13.1",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.13.1.tgz",
      "integrity": "sha512-UJnV3Rxc5TgUPJt2KJpo1Jpy0OKQr0AjgbZzBFjaPJcFOb2Y8jA5H3LT8HUJAiRLlWrEXWHbF1Z4SCZaQjWDHw==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.13.1"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/recharts": {
      "version": "3.8.0",
      "resolved": "https://registry.npmjs.org/recharts/-/recharts-3.8.0.tgz",
      "integrity": "sha512-Z/m38DX3L73ExO4Tpc9/iZWHmHnlzWG4njQbxsF5aSjwqmHNDDIm0rdEBArkwsBvR8U6EirlEHiQNYWCVh9sGQ==",
      "license": "MIT",
      "workspaces": [
        "www"
      ],
      "dependencies": {
        "@reduxjs/toolkit": "^1.9.0 || 2.x.x",
        "clsx": "^2.1.1",
        "decimal.js-light": "^2.5.1",
        "es-toolkit": "^1.39.3",
        "eventemitter3": "^5.0.1",
        "immer": "^10.1.1",
        "react-redux": "8.x.x || 9.x.x",
        "reselect": "5.1.1",
        "tiny-invariant": "^1.3.3",
        "use-sync-external-store": "^1.2.2",
        "victory-vendor": "^37.0.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
        "react-is": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/redux": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/redux/-/redux-5.0.1.tgz",
      "integrity": "sha512-M9/ELqF6fy8FwmkpnF0S3YKOqMyoWJ4+CS5Efg2ct3oY9daQvd/Pc71FpGZsVsbl3Cpb+IIcjBDUnnyBdQbq4w==",
      "license": "MIT"
    },
    "node_modules/redux-thunk": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/redux-thunk/-/redux-thunk-3.1.0.tgz",
      "integrity": "sha512-NW2r5T6ksUKXCabzhL9z+h206HQw/NJkcLm1GPImRQ8IzfXwRGqjVhKJGauHirT0DAuyy6hjdnMZaRoAcy0Klw==",
      "license": "MIT",
      "peerDependencies": {
        "redux": "^5.0.0"
      }
    },
    "node_modules/reselect": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/reselect/-/reselect-5.1.1.tgz",
      "integrity": "sha512-K/BG6eIky/SBpzfHZv/dd+9JBFiS4SWV7FIujVyJRux6e45+73RaUHXLmIR1f7WOMaQ0U1km6qwklRQxpJJY0w==",
      "license": "MIT"
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/rolldown": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/rolldown/-/rolldown-1.0.0-rc.9.tgz",
      "integrity": "sha512-9EbgWge7ZH+yqb4d2EnELAntgPTWbfL8ajiTW+SyhJEC4qhBbkCKbqFV4Ge4zmu5ziQuVbWxb/XwLZ+RIO7E8Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@oxc-project/types": "=0.115.0",
        "@rolldown/pluginutils": "1.0.0-rc.9"
      },
      "bin": {
        "rolldown": "bin/cli.mjs"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "optionalDependencies": {
        "@rolldown/binding-android-arm64": "1.0.0-rc.9",
        "@rolldown/binding-darwin-arm64": "1.0.0-rc.9",
        "@rolldown/binding-darwin-x64": "1.0.0-rc.9",
        "@rolldown/binding-freebsd-x64": "1.0.0-rc.9",
        "@rolldown/binding-linux-arm-gnueabihf": "1.0.0-rc.9",
        "@rolldown/binding-linux-arm64-gnu": "1.0.0-rc.9",
        "@rolldown/binding-linux-arm64-musl": "1.0.0-rc.9",
        "@rolldown/binding-linux-ppc64-gnu": "1.0.0-rc.9",
        "@rolldown/binding-linux-s390x-gnu": "1.0.0-rc.9",
        "@rolldown/binding-linux-x64-gnu": "1.0.0-rc.9",
        "@rolldown/binding-linux-x64-musl": "1.0.0-rc.9",
        "@rolldown/binding-openharmony-arm64": "1.0.0-rc.9",
        "@rolldown/binding-wasm32-wasi": "1.0.0-rc.9",
        "@rolldown/binding-win32-arm64-msvc": "1.0.0-rc.9",
        "@rolldown/binding-win32-x64-msvc": "1.0.0-rc.9"
      }
    },
    "node_modules/rolldown/node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.9",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.9.tgz",
      "integrity": "sha512-w6oiRWgEBl04QkFZgmW+jnU1EC9b57Oihi2ot3HNWIQRqgHp5PnYDia5iZ5FF7rpa4EQdiqMDXjlqKGXBhsoXw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.2.tgz",
      "integrity": "sha512-oeM1lpU/UvhTxw+g3cIfxXHyJRc/uidd3yK1P242gzHds0udQBYzs3y8j4gCCW+ZJ7ad0yctld8RYO+bdurlvw==",
      "license": "MIT"
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/split-type": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/split-type/-/split-type-0.3.4.tgz",
      "integrity": "sha512-otEk9vnD8qwfLsk3Lx0gz+qRkNIJCx0mlyL47ImP/DjMuV39d75Lpfwjn9fHteDRz0aoOblSzQjSNT9+Sswxcg==",
      "license": "ISC"
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.4.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.4.0.tgz",
      "integrity": "sha512-3TaVTaAv2gTiMB35i3FiGJaRfwb3Pyn/j3m/bfAvGe8FB7CF6u+LMYqYlDh7reQf7UNvoTvdfAqHGmPGOSsPmA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "dev": true,
      "license": "0BSD",
      "optional": true
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.57.0",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.57.0.tgz",
      "integrity": "sha512-W8GcigEMEeB07xEZol8oJ26rigm3+bfPHxHvwbYUlu1fUDsGuQ7Hiskx5xGW/xM4USc9Ephe3jtv7ZYPQntHeA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.57.0",
        "@typescript-eslint/parser": "8.57.0",
        "@typescript-eslint/typescript-estree": "8.57.0",
        "@typescript-eslint/utils": "8.57.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/undici-types": {
      "version": "7.16.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.16.0.tgz",
      "integrity": "sha512-Zz+aZWSj8LE6zoxD+xrjh4VfkIG8Ya6LvYkZqtUQGJPZjYl53ypCaUwWqo7eI0x66KBGeRo+mlBEkMSeSZ38Nw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/victory-vendor": {
      "version": "37.3.6",
      "resolved": "https://registry.npmjs.org/victory-vendor/-/victory-vendor-37.3.6.tgz",
      "integrity": "sha512-SbPDPdDBYp+5MJHhBCAyI7wKM3d5ivekigc2Dk2s7pgbZ9wIgIBYGVw4zGHBml/qTFbexrofXW6Gu4noGxrOwQ==",
      "license": "MIT AND ISC",
      "dependencies": {
        "@types/d3-array": "^3.0.3",
        "@types/d3-ease": "^3.0.0",
        "@types/d3-interpolate": "^3.0.1",
        "@types/d3-scale": "^4.0.2",
        "@types/d3-shape": "^3.1.0",
        "@types/d3-time": "^3.0.0",
        "@types/d3-timer": "^3.0.0",
        "d3-array": "^3.1.6",
        "d3-ease": "^3.0.1",
        "d3-interpolate": "^3.0.1",
        "d3-scale": "^4.0.2",
        "d3-shape": "^3.1.0",
        "d3-time": "^3.0.0",
        "d3-timer": "^3.0.1"
      }
    },
    "node_modules/vite": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/vite/-/vite-8.0.0.tgz",
      "integrity": "sha512-fPGaRNj9Zytaf8LEiBhY7Z6ijnFKdzU/+mL8EFBaKr7Vw1/FWcTBAMW0wLPJAGMPX38ZPVCVgLceWiEqeoqL2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@oxc-project/runtime": "0.115.0",
        "lightningcss": "^1.32.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.8",
        "rolldown": "1.0.0-rc.9",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "@vitejs/devtools": "^0.0.0-alpha.31",
        "esbuild": "^0.27.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "@vitejs/devtools": {
          "optional": true
        },
        "esbuild": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.3.6",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.3.6.tgz",
      "integrity": "sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    }
  }
}

```

## frontend/package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@studio-freight/lenis": "^1.0.42",
    "gsap": "^3.14.2",
    "lucide-react": "^0.577.0",
    "react": "^19.2.4",
    "react-circular-progressbar": "^2.2.0",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.13.1",
    "recharts": "^3.8.0",
    "split-type": "^0.3.4"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/node": "^24.12.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.0",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.56.1",
    "vite": "^8.0.0"
  }
}

```

## frontend/src/api/index.ts

```ts
const API_BASE = 'http://localhost:3001/api';

async function fetchAPI<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
}

async function postAPI<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
}

async function putAPI<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
}

async function deleteAPI<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'DELETE'
    });
    if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
    return res.json();
}

// CRUD APIs
export const farmersAPI = {
    getAll: () => fetchAPI('/farmers'),
    getOne: (id: string) => fetchAPI(`/farmers/${id}`),
    create: (data: Record<string, unknown>) => postAPI('/farmers', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/farmers/${id}`, data),
    delete: (id: string) => deleteAPI(`/farmers/${id}`)
};

export const agentsAPI = {
    getAll: () => fetchAPI('/agents'),
    getOne: (id: string) => fetchAPI(`/agents/${id}`),
    create: (data: Record<string, unknown>) => postAPI('/agents', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/agents/${id}`, data),
    delete: (id: string) => deleteAPI(`/agents/${id}`)
};

export const factoriesAPI = {
    getAll: () => fetchAPI('/factories'),
    getOne: (id: string) => fetchAPI(`/factories/${id}`),
    create: (data: Record<string, unknown>) => postAPI('/factories', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/factories/${id}`, data),
    delete: (id: string) => deleteAPI(`/factories/${id}`)
};

export const inputsAPI = {
    getAll: () => fetchAPI('/inputs'),
    getOne: (id: string) => fetchAPI(`/inputs/${id}`),
    create: (data: Record<string, unknown>) => postAPI('/inputs', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/inputs/${id}`, data),
    delete: (id: string) => deleteAPI(`/inputs/${id}`)
};

export const milkQualityAPI = {
    getAll: () => fetchAPI('/milk-quality'),
    getOne: (id: string) => fetchAPI(`/milk-quality/${id}`),
    create: (data: Record<string, unknown>) => postAPI('/milk-quality', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/milk-quality/${id}`, data),
    delete: (id: string) => deleteAPI(`/milk-quality/${id}`)
};

export const loansAPI = {
    getAll: () => fetchAPI('/loans'),
    getOne: (id: string) => fetchAPI(`/loans/${id}`),
    getByFarmer: (farmerId: string) => fetchAPI(`/loans/farmer/${farmerId}`),
    create: (data: Record<string, unknown>) => postAPI('/loans', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/loans/${id}`, data),
    delete: (id: string) => deleteAPI(`/loans/${id}`)
};

export const deliveriesAPI = {
    getAll: () => fetchAPI('/deliveries'),
    getOne: (id: string) => fetchAPI(`/deliveries/${id}`),
    getByFarmer: (farmerId: string) => fetchAPI(`/deliveries/farmer/${farmerId}`),
    getRate: (qualityId: string) => fetchAPI(`/deliveries/rate/${qualityId}`),
    create: (data: Record<string, unknown>) => postAPI('/deliveries', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/deliveries/${id}`, data),
    delete: (id: string) => deleteAPI(`/deliveries/${id}`)
};

export const inputPurchasesAPI = {
    getAll: () => fetchAPI('/input-purchases'),
    getOne: (id: string) => fetchAPI(`/input-purchases/${id}`),
    getByFarmer: (farmerId: string) => fetchAPI(`/input-purchases/farmer/${farmerId}`),
    getInputDetails: (inputId: string) => fetchAPI(`/input-purchases/input-details/${inputId}`),
    create: (data: Record<string, unknown>) => postAPI('/input-purchases', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/input-purchases/${id}`, data),
    delete: (id: string) => deleteAPI(`/input-purchases/${id}`)
};

export const salesAPI = {
    getAll: () => fetchAPI('/sales'),
    getOne: (id: string) => fetchAPI(`/sales/${id}`),
    getByAgent: (agentId: string) => fetchAPI(`/sales/agent/${agentId}`),
    getByFarmer: (farmerId: string) => fetchAPI(`/sales/farmer/${farmerId}`),
    create: (data: Record<string, unknown>) => postAPI('/sales', data),
    update: (id: string, data: Record<string, unknown>) => putAPI(`/sales/${id}`, data),
    delete: (id: string) => deleteAPI(`/sales/${id}`)
};

// Report APIs
export const reportsAPI = {
    farmersList: () => fetchAPI('/reports/farmers-list'),
    farmersListSummary: () => fetchAPI('/reports/farmers-list/summary'),
    agentsCommission: () => fetchAPI('/reports/agents-commission'),
    agentsCommissionSummary: () => fetchAPI('/reports/agents-commission/summary'),
    agentDetail: (id: string) => fetchAPI(`/reports/agents-commission/agent/${id}`),
    agentsTrends: () => fetchAPI('/reports/agents-commission/trends'),
    deliveries: () => fetchAPI('/reports/deliveries'),
    deliveriesOverview: () => fetchAPI('/reports/deliveries/overview'),
    deliveriesMonthly: () => fetchAPI('/reports/deliveries/monthly-totals'),
    deliveriesFarmer: (id: string) => fetchAPI(`/reports/deliveries/farmer/${id}`),
    deliveriesFarmerDetail: (id: string) => fetchAPI(`/reports/deliveries/farmer/${id}/details`),
    loans: () => fetchAPI('/reports/loans'),
    loansMonthly: () => fetchAPI('/reports/loans/monthly'),
    loansFarmerOverview: () => fetchAPI('/reports/loans/farmer-overview'),
    loansActive: () => fetchAPI('/reports/loans/active'),
    loansFarmer: (id: string) => fetchAPI(`/reports/loans/farmer/${id}`),
    loansPortfolio: () => fetchAPI('/reports/loans/portfolio'),
    purchases: () => fetchAPI('/reports/purchases'),
    purchasesMonthly: () => fetchAPI('/reports/purchases/monthly-totals'),
    purchasesFarmerOverview: () => fetchAPI('/reports/purchases/farmer-overview'),
    purchasesPopular: () => fetchAPI('/reports/purchases/popular-inputs'),
    purchasesFarmer: (id: string) => fetchAPI(`/reports/purchases/farmer/${id}`),
    purchasesPortfolio: () => fetchAPI('/reports/purchases/portfolio'),
    statements: () => fetchAPI('/reports/farmer-statements'),
    statementFarmer: (id: string) => fetchAPI(`/reports/farmer-statements/farmer/${id}`),
    statementLifetime: () => fetchAPI('/reports/farmer-statements/lifetime'),
    statementProfile: (id: string) => fetchAPI(`/reports/farmer-statements/farmer/${id}/profile`),
    statementTrends: () => fetchAPI('/reports/farmer-statements/monthly-trends'),
    statementSociety: () => fetchAPI('/reports/farmer-statements/society-summary')
};
```

## frontend/src/App.tsx

```tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import FarmersList from './pages/farmers/FarmersList.tsx';
import FarmerProfile from './pages/farmers/FarmerProfile.tsx';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/farmers" element={<FarmersList />} />
                <Route path="/farmers/:id" element={<FarmerProfile />} />
                {/* We'll add more routes as we build */}
            </Route>
        </Routes>
    );
}

export default App;
```

## frontend/src/components/common/DarkCard.tsx

```tsx
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface DarkCardProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
    hover?: boolean;
}

export default function DarkCard({ children, delay = 0, style, hover = true }: DarkCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(cardRef.current, {
            y: 30, opacity: 0, scale: 0.97,
            duration: 0.6, delay,
            ease: 'power3.out'
        });
    }, [delay]);

    return (
        <div
            ref={cardRef}
            style={{
                background: '#111827',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '24px',
                transition: hover ? 'transform 0.3s ease, box-shadow 0.3s ease' : 'none',
                cursor: hover ? 'default' : 'auto',
                ...style,
            }}
            onMouseEnter={(e) => {
                if (hover) {
                    gsap.to(e.currentTarget, {
                        y: -4, duration: 0.3, ease: 'power2.out',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.3)'
                    });
                }
            }}
            onMouseLeave={(e) => {
                if (hover) {
                    gsap.to(e.currentTarget, {
                        y: 0, duration: 0.3, ease: 'power2.out',
                        boxShadow: 'none'
                    });
                }
            }}
        >
            {children}
        </div>
    );
}
```

## frontend/src/components/common/FarmerCard.tsx

```tsx
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import type { Farmer } from '../../types';
import { formatDate } from '../../utils/formatCurrency';

gsap.registerPlugin(ScrollTrigger);

interface FarmerCardProps {
    farmer: Farmer;
    index: number;
}

const API_BASE = 'http://localhost:3001';

export default function FarmerCard({ farmer, index }: FarmerCardProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [, setFlipped] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!wrapperRef.current) return;
        gsap.set(wrapperRef.current, { y: 70, opacity: 0, scale: 0.93 });
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: 'top 92%',
                onEnter: () => {
                    gsap.to(wrapperRef.current, {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.8,
                        delay: (index % 4) * 0.08,
                        ease: 'expo.out',
                    });
                },
                once: true,
            });
        });
        return () => ctx.revert();
    }, [index]);

    const flip = (to: boolean) => {
        setFlipped(to);
        gsap.to(innerRef.current, {
            rotateY: to ? 180 : 0,
            duration: 0.6,
            ease: 'power2.inOut'
        });
    };

    const profilePic = farmer.ProfilePicUrl
    ? `${API_BASE}${farmer.ProfilePicUrl}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.FarmerName)}&background=1e1533&color=8b7cf6&size=200&font-size=0.45&bold=true&format=svg`;
    return (
        <div
            ref={wrapperRef}
            style={styles.perspective}
            onMouseEnter={() => flip(true)}
            onMouseLeave={() => flip(false)}
            onClick={() => {
                gsap.to(wrapperRef.current, {
                    scale: 0.95, duration: 0.15,
                    ease: 'power2.in',
                    onComplete: () => navigate(`/farmers/${farmer.FarmerId}`)
                });
            }}
        >
            <div ref={innerRef} style={styles.inner}>

                {/* ===== FRONT ===== */}
                <div style={styles.front}>
                    <div style={styles.stripe} />

                    <div style={styles.profileWrap}>
                        <div style={{ position: 'relative' }}>
                            <img src={profilePic} alt={farmer.FarmerName} style={styles.avatar} />
                            <div style={{
                                ...styles.dot,
                                background: farmer.Age < 35 ? 'var(--secondary)' : 'var(--warning)',
                            }} />
                        </div>
                        <div style={styles.idBadge}>{farmer.FarmerId}</div>
                    </div>

                    <h3 style={styles.name}>{farmer.FarmerName}</h3>
                    <div style={styles.locRow}>
                        <MapPin size={12} color="var(--primary)" />
                        <span style={styles.locText}>{farmer.Location}</span>
                    </div>

                    <div style={styles.tags}>
                        <span style={{
                            ...styles.tag,
                            background: farmer.Gender === 'Male'
                                ? 'rgba(139, 124, 246, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                            color: farmer.Gender === 'Male' ? 'var(--primary)' : '#ec4899',
                            border: farmer.Gender === 'Male'
                                ? '1px solid rgba(139, 124, 246, 0.2)'
                                : '1px solid rgba(236, 72, 153, 0.2)',
                        }}>
                            {farmer.Gender}
                        </span>
                        <span style={styles.tagNeutral}>Age: {farmer.Age}</span>
                    </div>
                </div>

                {/* ===== BACK ===== */}
                <div style={styles.back}>
                    <div style={styles.backInner}>
                        <div style={styles.backHead}>
                            <img src={profilePic} alt={farmer.FarmerName} style={styles.backAvatar} />
                            <div>
                                <h3 style={styles.backName}>{farmer.FarmerName}</h3>
                                <span style={styles.backId}>{farmer.FarmerId}</span>
                            </div>
                        </div>

                        <div style={styles.backRows}>
                            <div style={styles.row}><Phone size={13} color="var(--primary)" /><span>{farmer.Contact}</span></div>
                            <div style={styles.row}><Mail size={13} color="var(--primary)" /><span>{farmer.Email || 'No email'}</span></div>
                            <div style={styles.row}><MapPin size={13} color="var(--primary)" /><span>{farmer.Location}</span></div>
                            <div style={styles.row}><Calendar size={13} color="var(--primary)" /><span>Joined: {formatDate(farmer.EnrolmentDate)}</span></div>
                        </div>

                        <div style={styles.viewBtn}>
                            <span>View Profile</span>
                            <ArrowRight size={15} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    perspective: { perspective: '1200px', cursor: 'pointer' },
    inner: {
        position: 'relative',
        width: '100%', height: '290px',
        transformStyle: 'preserve-3d',
        borderRadius: '16px',
    },

    // FRONT
    front: {
        position: 'absolute',
        width: '100%', height: '100%',
        backfaceVisibility: 'hidden',
        background: 'var(--glass-bg-card)',
        backdropFilter: 'blur(12px) saturate(160%)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
    },
    stripe: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--primary), var(--accent))',
    },
    profileWrap: {
        position: 'relative',
        marginBottom: '12px',
        marginTop: '8px',
    },
    avatar: {
        width: '74px', height: '74px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid rgba(139, 124, 246, 0.2)',
    },
    dot: {
        position: 'absolute',
        bottom: '2px', right: '2px',
        width: '13px', height: '13px',
        borderRadius: '50%',
        border: '2px solid var(--base-200)',
    },
    idBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-24px',
    background: '#0d1117',
    color: 'var(--primary)',
    fontSize: '10px',
    fontWeight: 700,
    padding: '3px 8px',
    borderRadius: '6px',
    border: '1px solid rgba(139, 124, 246, 0.25)',
    letterSpacing: '0.3px',
    zIndex: 2,
},
    name: {
        fontSize: '15px',
        fontWeight: 700,
        color: 'var(--text-bright)',
        textAlign: 'center',
        marginBottom: '4px',
    },
    locRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginBottom: '14px',
    },
    locText: {
        fontSize: '12px',
        color: 'var(--text-muted)',
    },
    tags: {
        display: 'flex',
        gap: '8px',
        marginTop: 'auto',
    },
    tag: {
        fontSize: '11px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '8px',
    },
    tagNeutral: {
        fontSize: '11px',
        fontWeight: 600,
        padding: '4px 12px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.04)',
        color: 'var(--text-muted)',
        border: '1px solid var(--glass-border)',
    },

    // BACK
    back: {
        position: 'absolute',
        width: '100%', height: '100%',
        backfaceVisibility: 'hidden',
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '16px',
        transform: 'rotateY(180deg)',
        padding: '24px',
        border: '1px solid rgba(139, 124, 246, 0.1)',
    },
    backInner: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    backHead: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '16px',
        paddingBottom: '14px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    backAvatar: {
        width: '40px', height: '40px',
        borderRadius: '10px',
        objectFit: 'cover',
        border: '2px solid rgba(139, 124, 246, 0.25)',
    },
    backName: {
        fontSize: '14px',
        fontWeight: 700,
        color: 'var(--text-bright)',
    },
    backId: {
        fontSize: '11px',
        color: 'var(--primary)',
        fontWeight: 600,
    },
    backRows: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: 1,
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '12.5px',
        color: 'var(--text-normal)',
    },
    viewBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px',
        background: 'rgba(139, 124, 246, 0.1)',
        border: '1px solid rgba(139, 124, 246, 0.2)',
        borderRadius: '10px',
        color: 'var(--primary)',
        fontSize: '12.5px',
        fontWeight: 600,
        marginTop: 'auto',
        transition: 'background 0.3s ease',
    },
};
```

## frontend/src/components/common/FormField.tsx

```tsx
import type { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    children: ReactNode;
    error?: string;
}

export default function FormField({ label, children, error }: FormFieldProps) {
    return (
        <div style={S.field}>
            <label style={S.label}>{label}</label>
            {children}
            {error && <span style={S.error}>{error}</span>}
        </div>
    );
}

// Reusable input style
export const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    fontSize: '14px',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    color: '#e6edf3',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

export const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none' as const,
    cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '36px',
};

const S: Record<string, React.CSSProperties> = {
    field: {
        marginBottom: '18px',
    },
    label: {
        display: 'block',
        fontSize: '12px',
        fontWeight: 600,
        color: '#8b949e',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '6px',
    },
    error: {
        fontSize: '12px',
        color: '#ef4444',
        marginTop: '4px',
        display: 'block',
    },
};
```

## frontend/src/components/common/GlassCard.tsx

```tsx
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlassCardProps {
    children: ReactNode;
    delay?: number;
    style?: React.CSSProperties;
    hover?: boolean;
    scrollReveal?: boolean;
    className?: string;
}

export default function GlassCard({
    children, delay = 0, style,
    hover = true, scrollReveal = false
}: GlassCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        if (scrollReveal) {
            gsap.set(ref.current, { y: 60, opacity: 0, scale: 0.95 });
            ScrollTrigger.create({
                trigger: ref.current,
                start: 'top 88%',
                onEnter: () => {
                    gsap.to(ref.current, {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.8, delay,
                        ease: 'expo.out'
                    });
                },
                once: true,
            });
        } else {
            gsap.from(ref.current, {
                y: 40, opacity: 0, scale: 0.96,
                duration: 0.7, delay,
                ease: 'expo.out'
            });
        }
    }, [delay, scrollReveal]);

    return (
        <div
            ref={ref}
            className="glass-card"
            style={{ padding: '24px', ...style }}
            onMouseEnter={(e) => {
                if (!hover) return;
                gsap.to(e.currentTarget, {
                    y: -5, duration: 0.35,
                    ease: 'power2.out',
                });
            }}
            onMouseLeave={(e) => {
                if (!hover) return;
                gsap.to(e.currentTarget, {
                    y: 0, duration: 0.35,
                    ease: 'power2.out',
                });
            }}
        >
            {children}
        </div>
    );
}
```

## frontend/src/components/common/Modal.tsx

```tsx
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    width?: string;
}

export default function Modal({ isOpen, onClose, title, children, width = '520px' }: ModalProps) {
    const backdropRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        // Animate backdrop
        gsap.fromTo(backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        // Animate panel
        gsap.fromTo(panelRef.current,
            { opacity: 0, y: 50, scale: 0.92 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'expo.out', delay: 0.1 }
        );

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(panelRef.current, {
            opacity: 0, y: 30, scale: 0.95,
            duration: 0.25, ease: 'power2.in',
        });
        gsap.to(backdropRef.current, {
            opacity: 0, duration: 0.3, ease: 'power2.in',
            onComplete: onClose,
        });
    };

    if (!isOpen) return null;

    // Portal renders directly into document.body — escapes any parent stacking context
    return createPortal(
        <>
            {/* Layer 1: Backdrop (with blur) */}
            <div
                ref={backdropRef}
                onClick={handleClose}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    zIndex: 9998,
                }}
            />

            {/* Layer 2: Panel (above backdrop, NO blur applied to it) */}
            <div
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    padding: '20px',
                }}
            >
                <div
                    ref={panelRef}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '100%',
                        maxWidth: width,
                        background: '#161b22',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 32px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.04) inset',
                        pointerEvents: 'auto',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 24px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.02)',
                    }}>
                        <h2 style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: '#e6edf3',
                            margin: 0,
                        }}>{title}</h2>

                        <div
                            onClick={handleClose}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.color = '#8b949e';
                            }}
                            style={{
                                width: '34px', height: '34px',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#8b949e',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <X size={18} />
                        </div>
                    </div>

                    {/* Body */}
                    <div style={{
                        padding: '24px',
                        maxHeight: '70vh',
                        overflowY: 'auto',
                    }}>
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}
```

## frontend/src/components/common/StatCard.tsx

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: LucideIcon;
    color: string;
    delay?: number;
}

export default function StatCard({ title, value, subtitle, icon: Icon, color, delay = 0 }: StatCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const valRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!ref.current) return;
    // Set initial state immediately so card is never invisible
    gsap.set(ref.current, { opacity: 1, y: 0 });
    
    const ctx = gsap.context(() => {
        gsap.from(ref.current, {
            y: 30, opacity: 0,
            duration: 0.6,
            delay: Math.min(delay, 0.3), // Cap max delay to 0.3s
            ease: 'expo.out'
        });
        gsap.from(valRef.current, {
            scale: 0.8, opacity: 0,
            duration: 0.4,
            delay: Math.min(delay, 0.3) + 0.15,
            ease: 'back.out(1.5)'
        });
    });
    return () => ctx.revert();
}, [delay]);

    return (
        <div ref={ref} style={S.card}
            onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                    y: -4, duration: 0.3, ease: 'power2.out',
                    boxShadow: '0 16px 32px rgba(0,0,0,0.3)'
                });
            }}
            onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                    y: 0, duration: 0.3, ease: 'power2.out',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                });
            }}
        >
            <div style={S.iconRow}>
                <div style={{
                    width: 42, height: 42,
                    borderRadius: 12,
                    background: `${color}14`,
                    border: `1px solid ${color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Icon size={20} color={color} />
                </div>
            </div>
            <div style={S.title}>{title}</div>
            <div ref={valRef} style={S.value}>{value}</div>
            {subtitle && <div style={S.sub}>{subtitle}</div>}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${color}, transparent)`,
            }} />
        </div>
    );
}

const S: Record<string, React.CSSProperties> = {
    card: {
        background: 'rgba(22, 27, 34, 0.55)',
        backdropFilter: 'blur(12px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '16px',
        padding: '22px 24px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '155px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        transition: 'all 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    iconRow: {
        marginBottom: '14px',
    },
    title: {
        fontSize: '11px',
        fontWeight: 700,
        color: '#8b949e',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.8px',
        marginBottom: '6px',
    },
    value: {
        fontSize: '26px',
        fontWeight: 800,
        color: '#e6edf3',
        lineHeight: 1.1,
    },
    sub: {
        fontSize: '12px',
        color: '#484f58',
        marginTop: '6px',
    },
};
```

## frontend/src/components/common/StatusBadge.tsx

```tsx
interface StatusBadgeProps {
    status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const map: Record<string, { bg: string; color: string }> = {
        Credit:    { bg: 'rgba(74, 222, 128, 0.12)', color: '#4ade80' },
        Active:    { bg: 'rgba(139, 124, 246, 0.12)', color: '#8b7cf6' },
        Completed: { bg: 'rgba(45, 212, 191, 0.12)', color: '#2dd4bf' },
        Deficit:   { bg: 'rgba(239, 68, 68, 0.12)',  color: '#ef4444' },
        Zero:      { bg: 'rgba(234, 179, 8, 0.12)',  color: '#eab308' },
        Pending:   { bg: 'rgba(234, 179, 8, 0.12)',  color: '#eab308' },
    };

    const c = map[status] || map['Pending'];

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 10px',
            borderRadius: '8px',
            fontSize: '10px',
            fontWeight: 700,
            background: c.bg,
            color: c.color,
            letterSpacing: '0.3px',
            border: `1px solid ${c.color}20`,
        }}>
            {status}
        </span>
    );
}
```

## frontend/src/components/forms/DeliveryForm.tsx

```tsx
import { useState, useEffect } from 'react';
import type { Farmer, MilkQuality, Factory } from '../../types';
import { farmersAPI, milkQualityAPI, factoriesAPI, deliveriesAPI } from '../../api';
import Modal from '../common/Modal';
import FormField, { inputStyle, selectStyle } from '../common/FormField';

interface DeliveryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
}

const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#8b7cf6';
    e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
};
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
};

export default function DeliveryForm({ isOpen, onClose, onSaved }: DeliveryFormProps) {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [grades, setGrades] = useState<MilkQuality[]>([]);
    const [factories, setFactories] = useState<Factory[]>([]);
    const [form, setForm] = useState({
        farmerId: '', milkQuantity: '', qualityId: '',
        ratePerLitre: '', factoryId: '', deliveryDate: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            Promise.all([
                farmersAPI.getAll(),
                milkQualityAPI.getAll(),
                factoriesAPI.getAll(),
            ]).then(([f, g, fa]) => {
                setFarmers(f as Farmer[]);
                setGrades(g as MilkQuality[]);
                setFactories(fa as Factory[]);
            });
            setForm({ farmerId: '', milkQuantity: '', qualityId: '', ratePerLitre: '', factoryId: '', deliveryDate: '' });
            setError('');
        }
    }, [isOpen]);

    // Auto-fill rate when grade selected
    const handleGradeChange = (qualityId: string) => {
        const grade = grades.find(g => g.QualityId === qualityId);
        setForm(prev => ({
            ...prev,
            qualityId,
            ratePerLitre: grade ? String(grade.PricePerLitre) : '',
        }));
    };

    const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        if (!form.farmerId || !form.milkQuantity || !form.qualityId || !form.ratePerLitre || !form.factoryId || !form.deliveryDate) {
            setError('Please fill in all fields');
            return;
        }
        setSaving(true);
        setError('');
        try {
            await deliveriesAPI.create({
                farmerId: form.farmerId,
                milkQuantity: parseFloat(form.milkQuantity),
                qualityId: form.qualityId,
                ratePerLitre: parseFloat(form.ratePerLitre),
                factoryId: form.factoryId,
                deliveryDate: form.deliveryDate,
            });
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
        } finally { setSaving(false); }
    };

    const amount = form.milkQuantity && form.ratePerLitre
        ? (parseFloat(form.milkQuantity) * parseFloat(form.ratePerLitre)).toFixed(2)
        : '0.00';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Record Milk Delivery" width="580px">
            {error && <div style={S.err}>{error}</div>}

            <div style={S.grid}>
                <FormField label="Farmer *">
                    <select style={selectStyle} value={form.farmerId}
                        onChange={(e) => set('farmerId', e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select farmer</option>
                        {farmers.map(f => (
                            <option key={f.FarmerId} value={f.FarmerId}>
                                {f.FarmerName} ({f.FarmerId})
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Delivery Date *">
                    <input type="date" style={{ ...inputStyle, colorScheme: 'dark' }}
                        value={form.deliveryDate} onChange={(e) => set('deliveryDate', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Milk Quantity (Litres) *">
                    <input type="number" style={inputStyle} placeholder="e.g. 50"
                        value={form.milkQuantity} onChange={(e) => set('milkQuantity', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>

                <FormField label="Quality Grade *">
                    <select style={selectStyle} value={form.qualityId}
                        onChange={(e) => handleGradeChange(e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select grade</option>
                        {grades.map(g => (
                            <option key={g.QualityId} value={g.QualityId}>
                                Grade {g.Grade} — Ksh. {g.PricePerLitre}/L
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Rate Per Litre (Auto-filled)">
                    <input type="number" style={{ ...inputStyle, opacity: 0.7 }}
                        value={form.ratePerLitre} readOnly placeholder="Select grade first" />
                </FormField>

                <FormField label="Factory *">
                    <select style={selectStyle} value={form.factoryId}
                        onChange={(e) => set('factoryId', e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select factory</option>
                        {factories.map(f => (
                            <option key={f.FactoryId} value={f.FactoryId}>
                                {f.FactoryName}
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            {/* Amount Preview */}
            <div style={S.amountBox}>
                <span style={{ color: '#8b949e', fontSize: 13 }}>Total Amount</span>
                <span style={{ color: 'var(--secondary)', fontSize: 22, fontWeight: 800 }}>
                    Ksh. {parseFloat(amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </span>
            </div>

            <div style={S.actions}>
                <button onClick={onClose} style={S.cancelBtn}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}
                    disabled={saving} style={{ opacity: saving ? 0.6 : 1 }}>
                    {saving ? 'Saving...' : 'Record Delivery'}
                </button>
            </div>
        </Modal>
    );
}

const S: Record<string, React.CSSProperties> = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    err: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ef4444', marginBottom: 18 },
    amountBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(74, 222, 128, 0.06)', border: '1px solid rgba(74, 222, 128, 0.12)', borderRadius: 12, marginBottom: 8 },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' },
    cancelBtn: { padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' },
};
```

## frontend/src/components/forms/FarmerForm.tsx

```tsx
import { useState, useEffect } from 'react';
import type { Farmer } from '../../types';
import { farmersAPI } from '../../api';
import Modal from '../common/Modal';
import FormField, { inputStyle, selectStyle } from '../common/FormField';

interface FarmerFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
    editFarmer?: Farmer | null;
}

export default function FarmerForm({ isOpen, onClose, onSaved, editFarmer }: FarmerFormProps) {
    const [form, setForm] = useState({
        farmerName: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        location: '',
        contact: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editFarmer) {
            setForm({
                farmerName: editFarmer.FarmerName,
                dateOfBirth: editFarmer.DateOfBirth,
                gender: editFarmer.Gender,
                email: editFarmer.Email || '',
                location: editFarmer.Location,
                contact: editFarmer.Contact,
            });
        } else {
            setForm({ farmerName: '', dateOfBirth: '', gender: '', email: '', location: '', contact: '' });
        }
        setError('');
    }, [editFarmer, isOpen]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.farmerName || !form.dateOfBirth || !form.gender || !form.location || !form.contact) {
            setError('Please fill in all required fields');
            return;
        }

        setSaving(true);
        setError('');

        try {
            if (editFarmer) {
                await farmersAPI.update(editFarmer.FarmerId, form);
            } else {
                await farmersAPI.create(form);
            }
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editFarmer ? `Edit ${editFarmer.FarmerName}` : 'Add New Farmer'}
            width="560px"
        >
            {error && (
                <div style={S.errorBox}>{error}</div>
            )}

            <div style={S.grid}>
                <FormField label="Full Name *">
                    <input
                        style={inputStyle}
                        placeholder="e.g. John Kamau"
                        value={form.farmerName}
                        onChange={(e) => handleChange('farmerName', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>

                <FormField label="Date of Birth *">
                    <input
                        type="date"
                        style={{ ...inputStyle, colorScheme: 'dark' }}
                        value={form.dateOfBirth}
                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Gender *">
                    <select
                        style={selectStyle}
                        value={form.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </FormField>

                <FormField label="Email">
                    <input
                        type="email"
                        style={inputStyle}
                        placeholder="email@example.com"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Location *">
                    <input
                        style={inputStyle}
                        placeholder="e.g. Nairobi"
                        value={form.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>

                <FormField label="Contact *">
                    <input
                        style={inputStyle}
                        placeholder="e.g. 0712345678"
                        value={form.contact}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            {/* Buttons */}
            <div style={S.actions}>
                <button style={S.cancelBtn} onClick={onClose}>Cancel</button>
                <button
                    className="btn-primary"
                    style={{ opacity: saving ? 0.7 : 1 }}
                    onClick={handleSubmit}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : editFarmer ? 'Update Farmer' : 'Add Farmer'}
                </button>
            </div>
        </Modal>
    );
}

const S: Record<string, React.CSSProperties> = {
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
    },
    errorBox: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.2)',
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '13px',
        color: '#ef4444',
        marginBottom: '18px',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px',
        marginTop: '8px',
        paddingTop: '18px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
    },
    cancelBtn: {
        padding: '10px 24px',
        borderRadius: '10px',
        fontSize: '14px',
        fontWeight: 600,
        color: '#8b949e',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        transition: 'all 0.2s ease',
    },
};
```

## frontend/src/components/forms/LoanForm.tsx

```tsx
import { useState, useEffect } from 'react';
import type { Farmer } from '../../types';
import { farmersAPI, loansAPI } from '../../api';
import Modal from '../common/Modal';
import FormField, { inputStyle, selectStyle } from '../common/FormField';
import { formatCurrency } from '../../utils/formatCurrency';

interface LoanFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
}

const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#8b7cf6';
    e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
};
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
};

export default function LoanForm({ isOpen, onClose, onSaved }: LoanFormProps) {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [form, setForm] = useState({
        farmerId: '', loanAmount: '', repaymentPeriod: '', dateBorrowed: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            farmersAPI.getAll().then(f => setFarmers(f as Farmer[]));
            setForm({ farmerId: '', loanAmount: '', repaymentPeriod: '', dateBorrowed: '' });
            setError('');
        }
    }, [isOpen]);

    const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

    const interest = form.loanAmount && form.repaymentPeriod
        ? parseFloat(form.loanAmount) * 0.10 * (parseInt(form.repaymentPeriod) / 12)
        : 0;
    const total = form.loanAmount ? parseFloat(form.loanAmount) + interest : 0;
    const monthly = total && form.repaymentPeriod ? total / parseInt(form.repaymentPeriod) : 0;

    const handleSubmit = async () => {
        if (!form.farmerId || !form.loanAmount || !form.repaymentPeriod || !form.dateBorrowed) {
            setError('Please fill in all fields');
            return;
        }
        setSaving(true);
        setError('');
        try {
            await loansAPI.create({
                farmerId: form.farmerId,
                loanAmount: parseFloat(form.loanAmount),
                repaymentPeriod: parseInt(form.repaymentPeriod),
                dateBorrowed: form.dateBorrowed,
            });
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
        } finally { setSaving(false); }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Loan" width="560px">
            {error && <div style={S.err}>{error}</div>}

            <div style={S.grid}>
                <FormField label="Farmer *">
                    <select style={selectStyle} value={form.farmerId}
                        onChange={(e) => set('farmerId', e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select farmer</option>
                        {farmers.map(f => (
                            <option key={f.FarmerId} value={f.FarmerId}>
                                {f.FarmerName} ({f.FarmerId})
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Date Borrowed *">
                    <input type="date" style={{ ...inputStyle, colorScheme: 'dark' }}
                        value={form.dateBorrowed} onChange={(e) => set('dateBorrowed', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Loan Amount (Ksh) *">
                    <input type="number" style={inputStyle} placeholder="e.g. 50000"
                        value={form.loanAmount} onChange={(e) => set('loanAmount', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>

                <FormField label="Repayment Period (Months) *">
                    <input type="number" style={inputStyle} placeholder="e.g. 12"
                        value={form.repaymentPeriod} onChange={(e) => set('repaymentPeriod', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>
            </div>

            {/* Loan Summary */}
            <div style={S.summaryBox}>
                <div style={S.summaryRow}>
                    <span>Principal</span>
                    <span style={{ color: '#e6edf3' }}>{form.loanAmount ? formatCurrency(parseFloat(form.loanAmount)) : '—'}</span>
                </div>
                <div style={S.summaryRow}>
                    <span>Interest (10% p.a.)</span>
                    <span style={{ color: '#eab308' }}>{interest ? formatCurrency(interest) : '—'}</span>
                </div>
                <div style={{ ...S.summaryRow, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10 }}>
                    <span style={{ fontWeight: 700, color: '#e6edf3' }}>Total Repayable</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}>
                        {total ? formatCurrency(total) : '—'}
                    </span>
                </div>
                <div style={S.summaryRow}>
                    <span>Monthly Installment</span>
                    <span style={{ color: 'var(--secondary)' }}>{monthly ? formatCurrency(monthly) : '—'}</span>
                </div>
            </div>

            <div style={S.actions}>
                <button onClick={onClose} style={S.cancelBtn}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}
                    disabled={saving} style={{ opacity: saving ? 0.6 : 1 }}>
                    {saving ? 'Processing...' : 'Create Loan'}
                </button>
            </div>
        </Modal>
    );
}

const S: Record<string, React.CSSProperties> = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    err: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ef4444', marginBottom: 18 },
    summaryBox: { background: 'rgba(139, 124, 246, 0.05)', border: '1px solid rgba(139, 124, 246, 0.1)', borderRadius: 12, padding: '16px 20px', marginBottom: 8 },
    summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: '#8b949e' },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' },
    cancelBtn: { padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' },
};
```

## frontend/src/components/forms/PurchaseForm.tsx

```tsx
import { useState, useEffect } from 'react';
import type { Farmer, Input } from '../../types';
import { farmersAPI, inputsAPI, inputPurchasesAPI } from '../../api';
import Modal from '../common/Modal';
import FormField, { inputStyle, selectStyle } from '../common/FormField';
import { formatCurrency } from '../../utils/formatCurrency';

interface PurchaseFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
}

const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#8b7cf6';
    e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
};
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
};

export default function PurchaseForm({ isOpen, onClose, onSaved }: PurchaseFormProps) {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [inputs, setInputs] = useState<Input[]>([]);
    const [form, setForm] = useState({
        farmerId: '', inputId: '', inputName: '',
        inputPrice: '', quantity: '', dateOfPurchase: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            Promise.all([farmersAPI.getAll(), inputsAPI.getAll()])
                .then(([f, i]) => {
                    setFarmers(f as Farmer[]);
                    setInputs(i as Input[]);
                });
            setForm({ farmerId: '', inputId: '', inputName: '', inputPrice: '', quantity: '', dateOfPurchase: '' });
            setError('');
        }
    }, [isOpen]);

    const handleInputChange = (inputId: string) => {
        const input = inputs.find(i => i.InputId === inputId);
        setForm(prev => ({
            ...prev,
            inputId,
            inputName: input?.InputName || '',
            inputPrice: input ? String(input.InputPrice) : '',
        }));
    };

    const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
    const total = form.inputPrice && form.quantity
        ? parseFloat(form.inputPrice) * parseInt(form.quantity) : 0;

    const handleSubmit = async () => {
        if (!form.farmerId || !form.inputId || !form.quantity || !form.dateOfPurchase) {
            setError('Please fill in all fields');
            return;
        }
        setSaving(true);
        setError('');
        try {
            await inputPurchasesAPI.create({
                farmerId: form.farmerId,
                inputId: form.inputId,
                inputName: form.inputName,
                inputPrice: parseFloat(form.inputPrice),
                quantity: parseInt(form.quantity),
                dateOfPurchase: form.dateOfPurchase,
            });
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
        } finally { setSaving(false); }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Record Input Purchase" width="560px">
            {error && <div style={S.err}>{error}</div>}

            <div style={S.grid}>
                <FormField label="Farmer *">
                    <select style={selectStyle} value={form.farmerId}
                        onChange={(e) => set('farmerId', e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select farmer</option>
                        {farmers.map(f => (
                            <option key={f.FarmerId} value={f.FarmerId}>
                                {f.FarmerName} ({f.FarmerId})
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Purchase Date *">
                    <input type="date" style={{ ...inputStyle, colorScheme: 'dark' }}
                        value={form.dateOfPurchase} onChange={(e) => set('dateOfPurchase', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Input Item *">
                    <select style={selectStyle} value={form.inputId}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select input</option>
                        {inputs.map(i => (
                            <option key={i.InputId} value={i.InputId}>
                                {i.InputName} — Ksh. {i.InputPrice}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Unit Price (Auto-filled)">
                    <input style={{ ...inputStyle, opacity: 0.7 }} readOnly
                        value={form.inputPrice ? `Ksh. ${form.inputPrice}` : ''}
                        placeholder="Select input first" />
                </FormField>
            </div>

            <FormField label="Quantity *">
                <input type="number" style={inputStyle} placeholder="e.g. 3"
                    value={form.quantity} onChange={(e) => set('quantity', e.target.value)}
                    onFocus={focus} onBlur={blur} />
            </FormField>

            <div style={S.amountBox}>
                <span style={{ color: '#8b949e', fontSize: 13 }}>Total Amount</span>
                <span style={{ color: 'var(--accent)', fontSize: 22, fontWeight: 800 }}>
                    {total ? formatCurrency(total) : 'Ksh. 0.00'}
                </span>
            </div>

            <div style={S.actions}>
                <button onClick={onClose} style={S.cancelBtn}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}
                    disabled={saving} style={{ opacity: saving ? 0.6 : 1 }}>
                    {saving ? 'Saving...' : 'Record Purchase'}
                </button>
            </div>
        </Modal>
    );
}

const S: Record<string, React.CSSProperties> = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    err: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ef4444', marginBottom: 18 },
    amountBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(45, 212, 191, 0.06)', border: '1px solid rgba(45, 212, 191, 0.12)', borderRadius: 12, marginBottom: 8 },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' },
    cancelBtn: { padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' },
};
```

## frontend/src/components/forms/SaleForm.tsx

```tsx
import { useState, useEffect } from 'react';
import type { Farmer, Agent } from '../../types';
import { farmersAPI, agentsAPI, salesAPI } from '../../api';
import Modal from '../common/Modal';
import FormField, { inputStyle, selectStyle } from '../common/FormField';
import { formatCurrency } from '../../utils/formatCurrency';

interface SaleFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
}

const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#8b7cf6';
    e.target.style.boxShadow = '0 0 0 3px rgba(139,124,246,0.15)';
};
const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
};

export default function SaleForm({ isOpen, onClose, onSaved }: SaleFormProps) {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [form, setForm] = useState({
        saleDate: '', agentId: '', farmerId: '', saleAmount: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            Promise.all([farmersAPI.getAll(), agentsAPI.getAll()])
                .then(([f, a]) => {
                    setFarmers(f as Farmer[]);
                    setAgents(a as Agent[]);
                });
            setForm({ saleDate: '', agentId: '', farmerId: '', saleAmount: '' });
            setError('');
        }
    }, [isOpen]);

    const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
    const commission = form.saleAmount ? parseFloat(form.saleAmount) * 0.05 : 0;

    const handleSubmit = async () => {
        if (!form.saleDate || !form.agentId || !form.farmerId || !form.saleAmount) {
            setError('Please fill in all fields');
            return;
        }
        setSaving(true);
        setError('');
        try {
            await salesAPI.create({
                saleDate: form.saleDate,
                agentId: form.agentId,
                farmerId: form.farmerId,
                saleAmount: parseFloat(form.saleAmount),
            });
            onSaved();
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save');
        } finally { setSaving(false); }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Record Sale" width="520px">
            {error && <div style={S.err}>{error}</div>}

            <div style={S.grid}>
                <FormField label="Sale Date *">
                    <input type="date" style={{ ...inputStyle, colorScheme: 'dark' }}
                        value={form.saleDate} onChange={(e) => set('saleDate', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>

                <FormField label="Agent *">
                    <select style={selectStyle} value={form.agentId}
                        onChange={(e) => set('agentId', e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select agent</option>
                        {agents.map(a => (
                            <option key={a.AgentId} value={a.AgentId}>
                                {a.AgentName} ({a.AgentId})
                            </option>
                        ))}
                    </select>
                </FormField>
            </div>

            <div style={S.grid}>
                <FormField label="Farmer *">
                    <select style={selectStyle} value={form.farmerId}
                        onChange={(e) => set('farmerId', e.target.value)}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select farmer</option>
                        {farmers.map(f => (
                            <option key={f.FarmerId} value={f.FarmerId}>
                                {f.FarmerName} ({f.FarmerId})
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField label="Sale Amount (Ksh) *">
                    <input type="number" style={inputStyle} placeholder="e.g. 25000"
                        value={form.saleAmount} onChange={(e) => set('saleAmount', e.target.value)}
                        onFocus={focus} onBlur={blur} />
                </FormField>
            </div>

            <div style={S.commBox}>
                <span style={{ color: '#8b949e', fontSize: 13 }}>Commission (5%)</span>
                <span style={{ color: '#eab308', fontSize: 18, fontWeight: 800 }}>
                    {commission ? formatCurrency(commission) : 'Ksh. 0.00'}
                </span>
            </div>

            <div style={S.actions}>
                <button onClick={onClose} style={S.cancelBtn}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}
                    disabled={saving} style={{ opacity: saving ? 0.6 : 1 }}>
                    {saving ? 'Saving...' : 'Record Sale'}
                </button>
            </div>
        </Modal>
    );
}

const S: Record<string, React.CSSProperties> = {
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    err: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#ef4444', marginBottom: 18 },
    commBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(234, 179, 8, 0.06)', border: '1px solid rgba(234, 179, 8, 0.12)', borderRadius: 12, marginBottom: 8 },
    actions: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.05)' },
    cancelBtn: { padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#8b949e', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans, sans-serif' },
};
```

## frontend/src/components/layout/Header.tsx

```tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { Bell, Search, Sparkles } from 'lucide-react';

const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/farmers': 'Farmers Management',
    '/agents': 'Agents',
    '/factories': 'Factories',
    '/inputs': 'Inputs',
    '/milk-quality': 'Milk Quality',
    '/loans': 'Loans',
    '/deliveries': 'Deliveries',
    '/purchases': 'Purchases',
    '/sales': 'Sales',
};

export default function Header() {
    const ref = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const location = useLocation();
    const title = titles[location.pathname] || 'DairySphere';

    useEffect(() => {
        gsap.fromTo(titleRef.current,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
    }, [location.pathname]);

    useEffect(() => {
        gsap.from(ref.current, {
            y: -20, opacity: 0,
            duration: 0.6, ease: 'power3.out'
        });
    }, []);

    return (
        <div ref={ref} style={styles.header} className="glass">
            <div>
                <h1 ref={titleRef} style={styles.title}>{title}</h1>
                <p style={styles.date}>
                    {new Date().toLocaleDateString('en-KE', {
                        weekday: 'long', year: 'numeric',
                        month: 'long', day: 'numeric'
                    })}
                </p>
            </div>

            <div style={styles.actions}>
                <div style={styles.search}>
                    <Search size={15} color="var(--text-faint)" />
                    <input placeholder="Search..." style={styles.searchInput} />
                </div>

                <div style={styles.iconBtn}>
                    <Bell size={17} color="var(--text-muted)" />
                    <div style={styles.badge}>3</div>
                </div>
                <div style={styles.iconBtn}>
                    <Sparkles size={17} color="var(--primary)" />
                </div>

                <div style={styles.userWrap}>
                    <div style={styles.avatar}>AD</div>
                    <div>
                        <div style={styles.userName}>Admin</div>
                        <div style={styles.userRole}>Manager</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderRadius: 0,
    },
    title: {
        fontSize: '19px',
        fontWeight: 700,
        color: 'var(--text-bright)',
        letterSpacing: '-0.3px',
    },
    date: {
        fontSize: '11px',
        color: 'var(--text-faint)',
        marginTop: '2px',
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--glass-border)',
        borderRadius: '10px',
        padding: '7px 14px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: 'var(--text-normal)',
        width: '160px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    iconBtn: {
        width: '36px', height: '36px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative' as const,
    },
    badge: {
        position: 'absolute' as const,
        top: '-3px', right: '-3px',
        background: 'var(--primary)',
        color: '#fff',
        fontSize: '9px',
        fontWeight: 700,
        width: '16px', height: '16px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userWrap: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: '8px',
        paddingLeft: '14px',
        borderLeft: '1px solid var(--glass-border)',
    },
    avatar: {
        width: '34px', height: '34px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, var(--primary), #6d5ce7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
    },
    userName: {
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--text-bright)',
    },
    userRole: {
        fontSize: '10px',
        color: 'var(--text-faint)',
    },
};
```

## frontend/src/components/layout/Layout.tsx

```tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Sidebar from './Sidebar';
import Header from './Header';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
    const contentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Liquid page transition with blur
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 20, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)',
                  duration: 0.7, ease: 'expo.out' }
            );
        });
        setTimeout(() => ScrollTrigger.refresh(), 200);
        return () => ctx.revert();
    }, [location.pathname]);

    const ml = collapsed ? '72px' : '260px';

    return (
        <div style={styles.wrapper}>
            {/* Background image layer — change URL for different pages */}
            <div style={styles.bgLayer} />
            {/* Gradient overlay */}
            <div style={styles.gradientOverlay} />

            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

            <main style={{
                ...styles.main,
                marginLeft: ml,
                transition: 'margin-left 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}>
                <Header />
                <div ref={contentRef} style={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
    },
    bgLayer: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundImage: `url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2074&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.05,
        filter: 'grayscale(80%)',
        zIndex: 0,
    },
    gradientOverlay: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: `
            radial-gradient(ellipse at 0% 0%, rgba(139, 124, 246, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(74, 222, 128, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(45, 212, 191, 0.03) 0%, transparent 60%)
        `,
        zIndex: 0,
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
    },
    content: {
        padding: '28px 32px',
        flex: 1,
    },
};
```

## frontend/src/components/layout/Sidebar.tsx

```tsx
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, UserCheck, Factory,
    Package, Milk, Landmark, Truck,
    ShoppingCart, DollarSign, FileText,
    ChevronRight, Leaf, PanelLeftClose, PanelLeft
} from 'lucide-react';

const mainNav = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/farmers', label: 'Farmers', icon: Users },
    { path: '/agents', label: 'Agents', icon: UserCheck },
    { path: '/factories', label: 'Factories', icon: Factory },
    { path: '/inputs', label: 'Inputs', icon: Package },
    { path: '/milk-quality', label: 'Milk Quality', icon: Milk },
    { path: '/loans', label: 'Loans', icon: Landmark },
    { path: '/deliveries', label: 'Deliveries', icon: Truck },
    { path: '/purchases', label: 'Purchases', icon: ShoppingCart },
    { path: '/sales', label: 'Sales', icon: DollarSign },
];

const reportNav = [
    { path: '/reports/farmers-list', label: 'Farmers Report', icon: FileText },
    { path: '/reports/agents-commission', label: 'Commission', icon: FileText },
    { path: '/reports/deliveries', label: 'Deliveries', icon: FileText },
    { path: '/reports/loans', label: 'Loans', icon: FileText },
    { path: '/reports/purchases', label: 'Purchases', icon: FileText },
    { path: '/reports/statements', label: 'Statements', icon: FileText },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const location = useLocation();

    return (
        <div style={{
            ...S.sidebar,
            width: collapsed ? '72px' : '260px',
        }}>
            {/* Logo */}
            <div style={{
                ...S.logo,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '20px 0 12px' : '20px 20px 12px',
            }}>
                <div style={S.logoIcon}>
                    <Leaf size={20} color="var(--primary)" />
                </div>
                {!collapsed && (
                    <div>
                        <div style={S.logoText}>DairySphere</div>
                        <div style={S.logoSub}>SOCIETY</div>
                    </div>
                )}
            </div>

            {/* Toggle */}
            <div onClick={onToggle} style={{
                ...S.toggle,
                justifyContent: collapsed ? 'center' : 'flex-end',
                padding: collapsed ? '0' : '0 14px',
            }}>
                <div style={S.toggleBox}>
                    {collapsed
                        ? <PanelLeft size={15} color="var(--text-muted)" />
                        : <PanelLeftClose size={15} color="var(--text-muted)" />
                    }
                </div>
            </div>

            {/* Navigation */}
            <div style={S.scroll}>
                <NavSection
                    label="MAIN MENU"
                    items={mainNav}
                    collapsed={collapsed}
                    location={location}
                />
                <NavSection
                    label="REPORTS"
                    items={reportNav}
                    collapsed={collapsed}
                    location={location}
                />
            </div>

            {/* Bottom */}
            {!collapsed ? (
                <div style={S.bottom}>
                    <span style={{ fontSize: '18px' }}>🐄</span>
                    <div style={{ flex: 1 }}>
                        <div style={S.bottomName}>DairySphere v1.0</div>
                        <div style={S.bottomSub}>SQL Server Connected</div>
                    </div>
                    <div style={S.dot} />
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0' }}>
                    <div style={S.dot} />
                </div>
            )}
        </div>
    );
}

function NavSection({ label, items, collapsed, location }: {
    label: string;
    items: typeof mainNav;
    collapsed: boolean;
    location: ReturnType<typeof useLocation>;
}) {
    return (
        <div style={{ marginBottom: '14px' }}>
            {!collapsed
                ? <div style={S.navLabel}>{label}</div>
                : <div style={S.divider} />
            }
            {items.map((item) => {
                const isActive = item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        title={collapsed ? item.label : undefined}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '11px',
                            padding: collapsed ? '10px 0' : '10px 14px',
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: isActive ? 600 : 500,
                            marginBottom: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            background: isActive ? 'rgba(139, 124, 246, 0.1)' : 'transparent',
                            borderLeft: isActive && !collapsed
                                ? '3px solid var(--primary)' : '3px solid transparent',
                            transition: 'all 0.25s ease',
                        }}
                    >
                        <item.icon
                            size={18}
                            color={isActive ? 'var(--primary)' : '#7d8590'}
                            style={{ flexShrink: 0 }}
                        />
                        {!collapsed && (
                            <>
                                <span style={{
                                    color: isActive ? '#e6edf3' : '#9da5ae',
                                }}>{item.label}</span>
                                {isActive && (
                                    <ChevronRight size={14} color="var(--primary)"
                                        style={{ marginLeft: 'auto' }} />
                                )}
                            </>
                        )}
                    </NavLink>
                );
            })}
        </div>
    );
}

const S: Record<string, React.CSSProperties> = {
    sidebar: {
        height: '100vh',
        background: 'rgba(13, 17, 23, 0.75)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        position: 'fixed',
        left: 0, top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.3s ease',
    },
    logoIcon: {
        width: '36px', height: '36px',
        borderRadius: '10px',
        background: 'rgba(139, 124, 246, 0.1)',
        border: '1px solid rgba(139, 124, 246, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    logoText: {
        fontSize: '17px',
        fontWeight: 800,
        color: '#e6edf3',
        lineHeight: 1.1,
        whiteSpace: 'nowrap',
    },
    logoSub: {
        fontSize: '9px',
        fontWeight: 700,
        color: 'var(--primary)',
        letterSpacing: '3px',
    },
    toggle: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        cursor: 'pointer',
    },
    toggleBox: {
        width: '30px', height: '30px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '0 8px',
    },
    navLabel: {
        fontSize: '10px',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.18)',
        letterSpacing: '1.5px',
        padding: '10px 14px 6px',
        whiteSpace: 'nowrap',
    },
    divider: {
        height: '1px',
        background: 'rgba(255,255,255,0.05)',
        margin: '8px 12px',
    },
    bottom: {
        margin: '8px 10px 14px',
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    bottomName: {
        fontSize: '11px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.55)',
        whiteSpace: 'nowrap',
    },
    bottomSub: {
        fontSize: '10px',
        color: 'rgba(255,255,255,0.2)',
        whiteSpace: 'nowrap',
    },
    dot: {
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: 'var(--secondary)',
        flexShrink: 0,
        boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)',
    },
};
```

## frontend/src/index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

:root {
    /* Your DaisyUI OKLCH Theme — mapped to hex fallbacks */
    --base-100: #0d1117;
    --base-200: #161b22;
    --base-300: #21262d;
    --base-content: #e6edf3;
    --primary: #8b7cf6;
    --primary-content: #1e1533;
    --secondary: #4ade80;
    --secondary-content: #0f2e1a;
    --accent: #2dd4bf;
    --accent-content: #0d312b;
    --info: #3b82f6;
    --info-content: #e0edff;
    --success: #22c55e;
    --success-content: #e0fbe9;
    --warning: #eab308;
    --warning-content: #fef9e0;
    --error: #ef4444;
    --error-content: #fde0e0;

    /* Glass System */
    --glass-bg: rgba(13, 17, 23, 0.65);
    --glass-bg-light: rgba(22, 27, 34, 0.5);
    --glass-bg-card: rgba(22, 27, 34, 0.45);
    --glass-border: rgba(255, 255, 255, 0.06);
    --glass-border-hover: rgba(255, 255, 255, 0.12);
    --glass-blur: blur(20px) saturate(180%);
    --glass-blur-heavy: blur(40px) saturate(200%);

    /* Text */
    --text-bright: #f0f6fc;
    --text-normal: #c9d1d9;
    --text-muted: #8b949e;
    --text-faint: #484f58;

    /* Layout */
    --sidebar-width: 260px;
    --sidebar-collapsed: 72px;
    --header-height: 70px;

    /* Radius */
    --radius: 16px;
    --radius-sm: 10px;
    --radius-xs: 6px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html { scroll-behavior: smooth; }

body {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    background: var(--base-100);
    color: var(--base-content);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
}

/* ====== SCROLLBAR ====== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--text-faint); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

/* ====== GLASS CLASSES ====== */
.glass {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: 1px solid var(--glass-border);
}

.glass-card {
    background: var(--glass-bg-card);
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.glass-card:hover {
    background: rgba(22, 27, 34, 0.65);
    border-color: var(--glass-border-hover);
    transform: translateY(-4px);
    box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

/* ====== RECHARTS FIX ====== */
.recharts-text, .recharts-cartesian-axis-tick-value {
    fill: var(--text-muted) !important;
    font-size: 11px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
}
.recharts-cartesian-grid line {
    stroke: rgba(255, 255, 255, 0.04) !important;
}
.recharts-tooltip-wrapper {
    filter: drop-shadow(0 8px 24px rgba(0,0,0,0.5));
}

/* ====== ANIMATIONS ====== */
@keyframes spin { to { transform: rotate(360deg); } }

@keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 8px rgba(139, 124, 246, 0.4); }
    50% { box-shadow: 0 0 20px rgba(139, 124, 246, 0.6); }
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}

/* ====== BUTTON ====== */
.btn-primary {
    background: linear-gradient(135deg, var(--primary), #6d5ce7);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    padding: 10px 24px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(139, 124, 246, 0.3);
}
/* Dark themed select dropdowns */
select option {
    background: #161b22;
    color: #e6edf3;
    padding: 8px;
}

select option:hover,
select option:checked {
    background: rgba(139, 124, 246, 0.2);
    color: #e6edf3;
}

/* Dark themed date picker */
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.7);
    cursor: pointer;
}

/* Remove default select styling on Firefox */
select {
    -moz-appearance: none;
}
```

## frontend/src/main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```

## frontend/src/pages/Dashboard.tsx

```tsx
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Users, Truck, DollarSign, Landmark,
    Activity, ArrowUpRight, ArrowRight, TrendingUp
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
    ResponsiveContainer, AreaChart, Area,
    PieChart, Pie, Cell
} from 'recharts';
import { reportsAPI, farmersAPI } from '../api';
import GlassCard from '../components/common/GlassCard';
import StatusBadge from '../components/common/StatusBadge';
import { formatCurrency } from '../utils/formatCurrency';
import type { Farmer } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface SocietySummary {
    TotalFarmers: number;
    TotalDeliveryRevenue: number;
    TotalCommissionPaid: number;
    TotalLoanCollected: number;
    TotalInputsSold: number;
    TotalDeductions: number;
    TotalDisbursed: number;
    AvgMonthlyPayment: number;
}

interface LoanPortfolio {
    TotalLoans: number;
    ActiveLoans: number;
    CompletedLoans: number;
    TotalOutstanding: number;
    TotalInterestEarned: number;
    TotalDisbursed: number;
}

interface MonthlyTrend {
    MonthDisplay: string;
    TxnMonth: string;
    TotalNetPayments: number;
    TotalDeliveries: number;
    FarmersInCredit: number;
    FarmersInDeficit: number;
}

// Custom tooltip for charts
const ChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
        <div style={{
            background: 'rgba(13, 17, 23, 0.9)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
        }}>
            <p style={{ color: '#8b949e', fontSize: '11px', marginBottom: '6px' }}>{label}</p>
            {payload.map((item: any, i: number) => (
                <p key={i} style={{ color: item.color, fontSize: '13px', fontWeight: 600 }}>
                    {item.name}: {typeof item.value === 'number' && item.value > 100
                        ? formatCurrency(item.value) : item.value}
                </p>
            ))}
        </div>
    );
};

export default function Dashboard() {
    const pageRef = useRef<HTMLDivElement>(null);
    const [society, setSociety] = useState<SocietySummary | null>(null);
    const [loans, setLoans] = useState<LoanPortfolio | null>(null);
    const [trends, setTrends] = useState<MonthlyTrend[]>([]);
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const [s, l, t, f] = await Promise.all([
                reportsAPI.statementSociety(),
                reportsAPI.loansPortfolio(),
                reportsAPI.statementTrends(),
                farmersAPI.getAll(),
            ]);
            setSociety(s as SocietySummary);
            setLoans(l as LoanPortfolio);
            setTrends(t as MonthlyTrend[]);
            setFarmers(f as Farmer[]);
            setLoading(false);
        } catch (err) {
            console.error('Dashboard load failed:', err);
            setLoading(false);
        }
    };

    // Hero text animation after load
    useEffect(() => {
        if (!loading && pageRef.current) {
            gsap.from('.hero-el', {
                y: 40, opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: 'expo.out',
            });
        }
    }, [loading]);

    const barData = trends.map(t => ({
        month: (t.MonthDisplay || '').split(' ')[0]?.substring(0, 3) || t.TxnMonth,
        amount: Math.round(t.TotalNetPayments || 0),
    }));

    const areaData = trends.map(t => ({
        month: (t.MonthDisplay || '').split(' ')[0]?.substring(0, 3) || t.TxnMonth,
        credit: t.FarmersInCredit || 0,
        deficit: t.FarmersInDeficit || 0,
    }));

    const pieData = loans ? [
        { name: 'Active', value: loans.ActiveLoans || 0, color: 'var(--primary)' },
        { name: 'Completed', value: loans.CompletedLoans || 0, color: 'var(--secondary)' },
    ] : [];

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
                <div style={{ width: 40, height: 40, border: '3px solid var(--base-300)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <p style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div ref={pageRef}>
            {/* ===== HERO ===== */}
            <div className="glass-card" style={{ padding: '32px 36px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <p className="hero-el" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                        Welcome back to
                    </p>
                    <h1 className="hero-el" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-bright)', marginBottom: 6 }}>
                        DairySphere Society 🐄
                    </h1>
                    <p className="hero-el" style={{ fontSize: 13, color: 'var(--text-faint)' }}>
                        Your cooperative at a glance — real-time insights
                    </p>
                </div>
                <div className="hero-el" style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(139, 124, 246, 0.08)',
                    border: '1px solid rgba(139, 124, 246, 0.15)',
                    borderRadius: 12, padding: '10px 18px',
                }}>
                    <Activity size={16} color="var(--primary)" />
                    <span style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 600 }}>Live</span>
                    <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: 'var(--primary)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                    }} />
                </div>
            </div>

            {/* ===== STAT CARDS ===== */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                {[
                    { icon: Users, color: 'var(--primary)', label: 'Total Farmers', value: String(society?.TotalFarmers || 0), trend: 'Active' },
                    { icon: Truck, color: 'var(--secondary)', label: 'Delivery Revenue', value: society ? formatCurrency(society.TotalDeliveryRevenue) : '—', trend: '+12%' },
                    { icon: Landmark, color: 'var(--warning)', label: 'Outstanding Loans', value: loans ? formatCurrency(loans.TotalOutstanding) : '—', trend: `${loans?.ActiveLoans || 0} active` },
                    { icon: DollarSign, color: 'var(--accent)', label: 'Total Disbursed', value: society ? formatCurrency(society.TotalDisbursed) : '—', trend: 'This period' },
                ].map((stat, i) => (
                    <GlassCard key={stat.label} delay={0.1 + i * 0.1}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                            <stat.icon size={20} color={stat.color} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <ArrowUpRight size={13} color={stat.color} />
                                <span style={{ fontSize: 11, color: stat.color, fontWeight: 600 }}>{stat.trend}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-bright)', marginBottom: 4 }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</div>
                    </GlassCard>
                ))}
            </div>

            {/* ===== CHARTS ROW ===== */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                {/* Bar Chart */}
                <GlassCard delay={0.5} scrollReveal style={{ flex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 2 }}>
                                Monthly Payments
                            </h3>
                            <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>
                                Net disbursement to farmers
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 0, background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
                            <span style={{ padding: '5px 14px', fontSize: 11, fontWeight: 600, color: 'var(--text-bright)', background: 'rgba(139,124,246,0.12)' }}>Chart</span>
                            <span style={{ padding: '5px 14px', fontSize: 11, color: 'var(--text-faint)', cursor: 'pointer' }}>Table</span>
                        </div>
                    </div>
                    <div style={{ height: 240, marginTop: 12 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#8b949e', fontSize: 11 }}
                                    dy={8}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#484f58', fontSize: 10 }}
                                    width={60}
                                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                <Bar
                                    dataKey="amount"
                                    name="Payment"
                                    fill="#8b7cf6"
                                    radius={[6, 6, 0, 0]}
                                    maxBarSize={36}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Pie Chart */}
                <GlassCard delay={0.6} scrollReveal style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 2 }}>
                        Loan Portfolio
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 4 }}>
                        Active vs Completed
                    </p>
                    <div style={{ height: 180 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%" cy="50%"
                                    innerRadius={50} outerRadius={72}
                                    dataKey="value"
                                    strokeWidth={0}
                                    paddingAngle={4}
                                >
                                    {pieData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8 }}>
                        {pieData.map(item => (
                            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.name}: {item.value}</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* ===== BOTTOM ROW ===== */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                {/* Area Chart */}
                <GlassCard delay={0.2} scrollReveal style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 2 }}>
                        Farmer Health
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>
                        Monthly credit vs deficit
                    </p>
                    <div style={{ height: 200, marginTop: 12 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                    <linearGradient id="gCredit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4ade80" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gDeficit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="month" axisLine={false} tickLine={false}
                                    tick={{ fill: '#8b949e', fontSize: 11 }} dy={8}
                                />
                                <YAxis axisLine={false} tickLine={false}
                                    tick={{ fill: '#484f58', fontSize: 10 }} width={30}
                                />
                                <Tooltip content={<ChartTooltip />} />
                                <Area type="monotone" dataKey="credit" name="Credit"
                                    stroke="#4ade80" fill="url(#gCredit)" strokeWidth={2} />
                                <Area type="monotone" dataKey="deficit" name="Deficit"
                                    stroke="#ef4444" fill="url(#gDeficit)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Recent Farmers */}
                <GlassCard delay={0.3} scrollReveal style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 2 }}>
                                Recent Farmers
                            </h3>
                            <p style={{ fontSize: 12, color: 'var(--text-faint)' }}>Latest members</p>
                        </div>
                        <ArrowRight size={16} color="var(--text-faint)" style={{ cursor: 'pointer' }} />
                    </div>

                    {farmers.slice(0, 5).map((f, i) => (
                        <div key={f.FarmerId} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '10px 0',
                            borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                        }}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(f.FarmerName)}&background=8b7cf6&color=fff&size=40&font-size=0.45&bold=true`}
                                alt={f.FarmerName}
                                style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover' }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-bright)' }}>{f.FarmerName}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{f.Location}</div>
                            </div>
                            <StatusBadge status={f.Gender === 'Male' ? 'Active' : 'Completed'} />
                        </div>
                    ))}
                </GlassCard>
            </div>

            {/* ===== QUICK STATS ===== */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                    { label: 'Avg Monthly Payment', value: society ? formatCurrency(society.AvgMonthlyPayment) : '—' },
                    { label: 'Commission Paid', value: society ? formatCurrency(society.TotalCommissionPaid) : '—' },
                    { label: 'Inputs Sold', value: society ? formatCurrency(society.TotalInputsSold) : '—' },
                    { label: 'Interest Earned', value: loans ? formatCurrency(loans.TotalInterestEarned) : '—' },
                ].map((item, i) => (
                    <GlassCard key={item.label} delay={0.1 + i * 0.08} scrollReveal
                        style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                            {item.label}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>
                            {item.value}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
```

## frontend/src/pages/farmers/FarmerProfile.tsx

```tsx
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowLeft, MapPin, Phone, Mail, Calendar,
    Truck, Landmark, ShoppingCart, DollarSign, TrendingUp
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, CartesianGrid
} from 'recharts';
import { reportsAPI } from '../../api';
import GlassCard from '../../components/common/GlassCard';
import StatusBadge from '../../components/common/StatusBadge';
import { formatCurrency } from '../../utils/formatCurrency';

gsap.registerPlugin(ScrollTrigger);

interface Profile {
    FarmerId: string;
    FarmerName: string;
    FarmerLocation: string;
    FarmerContact: string;
    FarmerEmail: string | null;
    ProfilePicUrl: string | null;
    Age: number;
    Gender: string;
    EnrolmentDate: string;
    ActiveMonths: number;
    LifetimeDeliveries: number;
    LifetimeLitres: number;
    LifetimeDeliveryAmount: number;
    LifetimeCommission: number;
    LifetimeLoanDeductions: number;
    LifetimeInputsPurchased: number;
    LifetimeTotalDeductions: number;
    LifetimeNetEarnings: number;
    AvgMonthlyNetPayment: number;
    BestMonthEarning: number;
    WorstMonthEarning: number;
    MonthsInCredit: number;
    MonthsInDeficit: number;
}

interface Monthly {
    MonthDisplay: string;
    DeliveryAmount: number;
    CommissionDeduction: number;
    LoanDeduction: number;
    InputsDeduction: number;
    TotalDeductions: number;
    NetPayment: number;
    PaymentStatus: string;
    TotalLitres: number;
    DeliveryCount: number;
}

const API_BASE = 'http://localhost:3001';

const ChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;
    return (
        <div style={{
            background: 'rgba(13,17,23,0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '12px 16px',
        }}>
            <p style={{ color: '#8b949e', fontSize: 11, marginBottom: 6 }}>{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
                    {p.name}: {formatCurrency(p.value)}
                </p>
            ))}
        </div>
    );
};

export default function FarmerProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const pageRef = useRef<HTMLDivElement>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [monthly, setMonthly] = useState<Monthly[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) loadProfile();
    }, [id]);

    const loadProfile = async () => {
        try {
            const data = await reportsAPI.statementProfile(id!) as {
                profile: Profile;
                monthlyStatements: Monthly[];
            };
            setProfile(data.profile);
            setMonthly(data.monthlyStatements);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!loading && pageRef.current) {
            gsap.from('.p-section', {
                y: 50, opacity: 0,
                duration: 0.7, stagger: 0.1,
                ease: 'expo.out',
            });
        }
    }, [loading]);

    if (loading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
                <div style={{ width: 40, height: 40, border: '3px solid var(--base-300)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <p style={{ color: 'var(--text-muted)' }}>Loading profile...</p>
            </div>
        );
    }

    if (!profile) {
        return <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 60 }}>Farmer not found or has no transactions</p>;
    }

    const pic = profile.ProfilePicUrl
        ? `${API_BASE}${profile.ProfilePicUrl}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.FarmerName)}&background=8b7cf6&color=fff&size=200&font-size=0.4&bold=true`;

    const chartData = monthly.map(m => ({
        month: (m.MonthDisplay || '').split(' ')[0]?.substring(0, 3),
        earnings: m.DeliveryAmount,
        deductions: m.TotalDeductions,
        net: m.NetPayment,
    }));

    return (
        <div ref={pageRef}>
            {/* Back */}
            <div className="p-section"
                onClick={() => navigate('/farmers')}
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    cursor: 'pointer', marginBottom: 20,
                    color: 'var(--text-muted)', fontSize: 14, fontWeight: 500,
                    transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8b949e')}
            >
                <ArrowLeft size={18} /> Back to Farmers
            </div>

            {/* ===== PROMINENT PROFILE HEADER ===== */}
            <div className="p-section" style={S.profileHeader}>
                {/* Background gradient accent */}
                <div style={S.headerBgAccent} />

                {/* Profile pic + Name row */}
                <div style={S.profileTop}>
                    <div style={S.avatarWrap}>
                        <img src={pic} alt={profile.FarmerName} style={S.avatar} />
                        <div style={{
                            ...S.onlineDot,
                            background: profile.LifetimeNetEarnings >= 0 ? 'var(--secondary)' : 'var(--error)',
                        }} />
                    </div>

                    <div style={S.profileInfo}>
                        <div style={S.profileIdRow}>
                            <span style={S.profileId}>{profile.FarmerId}</span>
                            <StatusBadge status={profile.Gender} />
                            <StatusBadge status={`Age ${profile.Age}`} />
                        </div>
                        <h1 style={S.profileName}>{profile.FarmerName}</h1>
                        <div style={S.profileMeta}>
                            <span style={S.metaItem}>
                                <MapPin size={14} color="var(--primary)" /> {profile.FarmerLocation}
                            </span>
                            <span style={S.metaItem}>
                                <Phone size={14} color="var(--primary)" /> {profile.FarmerContact}
                            </span>
                            <span style={S.metaItem}>
                                <Mail size={14} color="var(--primary)" /> {profile.FarmerEmail || 'N/A'}
                            </span>
                            <span style={S.metaItem}>
                                <Calendar size={14} color="var(--primary)" /> Member since {profile.EnrolmentDate}
                            </span>
                        </div>
                    </div>

                    {/* Lifetime Earnings Badge */}
                    <div style={S.earningsBox}>
                        <div style={S.earningsLabel}>LIFETIME EARNINGS</div>
                        <div style={{
                            ...S.earningsValue,
                            color: profile.LifetimeNetEarnings >= 0 ? 'var(--secondary)' : 'var(--error)',
                        }}>
                            {formatCurrency(profile.LifetimeNetEarnings)}
                        </div>
                        <div style={S.earningsSub}>
                            {profile.ActiveMonths} months active • {profile.LifetimeDeliveries} deliveries
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== STAT CARDS ===== */}
            <div className="p-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                {[
                    { icon: Truck, color: '#8b7cf6', label: 'Delivery Revenue', value: formatCurrency(profile.LifetimeDeliveryAmount) },
                    { icon: DollarSign, color: '#ef4444', label: 'Commission Paid', value: formatCurrency(profile.LifetimeCommission) },
                    { icon: Landmark, color: '#eab308', label: 'Loan Deductions', value: formatCurrency(profile.LifetimeLoanDeductions) },
                    { icon: ShoppingCart, color: '#2dd4bf', label: 'Inputs Purchased', value: formatCurrency(profile.LifetimeInputsPurchased) },
                ].map((s, i) => (
                    <GlassCard key={s.label} delay={0.1 + i * 0.08} scrollReveal>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                            <s.icon size={18} color={s.color} />
                            <span style={{ fontSize: 11, color: '#8b949e', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>{s.label}</span>
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#e6edf3' }}>{s.value}</div>
                    </GlassCard>
                ))}
            </div>

            {/* ===== CHARTS ===== */}
            <div className="p-section" style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                {/* Bar Chart */}
                <GlassCard scrollReveal delay={0.2} style={{ flex: 2 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e6edf3', marginBottom: 2 }}>Monthly Breakdown</h3>
                    <p style={{ fontSize: 12, color: '#484f58', marginBottom: 16 }}>Earnings vs deductions over time</p>
                    <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false}
                                    tick={{ fill: '#8b949e', fontSize: 11 }} dy={8} />
                                <YAxis axisLine={false} tickLine={false}
                                    tick={{ fill: '#484f58', fontSize: 10 }} width={55}
                                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Bar dataKey="earnings" name="Earnings" fill="#8b7cf6" radius={[4, 4, 0, 0]} maxBarSize={28} />
                                <Bar dataKey="deductions" name="Deductions" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Performance */}
                <GlassCard scrollReveal delay={0.3} style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e6edf3', marginBottom: 2 }}>Performance</h3>
                    <p style={{ fontSize: 12, color: '#484f58', marginBottom: 16 }}>Key indicators</p>
                    {[
                        { label: 'Best Month', value: formatCurrency(profile.BestMonthEarning), color: 'var(--secondary)' },
                        { label: 'Worst Month', value: formatCurrency(profile.WorstMonthEarning), color: 'var(--error)' },
                        { label: 'Avg Monthly', value: formatCurrency(profile.AvgMonthlyNetPayment), color: 'var(--primary)' },
                        { label: 'Months in Credit', value: String(profile.MonthsInCredit), color: 'var(--secondary)' },
                        { label: 'Months in Deficit', value: String(profile.MonthsInDeficit), color: 'var(--error)' },
                        { label: 'Total Litres', value: `${profile.LifetimeLitres?.toLocaleString() || 0} L`, color: 'var(--accent)' },
                    ].map(item => (
                        <div key={item.label} style={{
                            display: 'flex', justifyContent: 'space-between',
                            padding: '10px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <span style={{ fontSize: 12, color: '#8b949e' }}>{item.label}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}</span>
                        </div>
                    ))}
                </GlassCard>
            </div>

            {/* ===== MONTHLY STATEMENT TABLE ===== */}
            <GlassCard scrollReveal delay={0.3} className="p-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#e6edf3', marginBottom: 2 }}>Monthly Statements</h3>
                        <p style={{ fontSize: 12, color: '#484f58' }}>Complete financial breakdown</p>
                    </div>
                    <TrendingUp size={18} color="var(--primary)" />
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {['Month', 'Deliveries', 'Commission', 'Loan', 'Inputs', 'Deductions', 'Net Payment', 'Status'].map(h => (
                                    <th key={h} style={{
                                        textAlign: 'left', padding: '10px 12px',
                                        fontSize: 10, fontWeight: 700, color: '#484f58',
                                        textTransform: 'uppercase', letterSpacing: 1,
                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {monthly.map((m, i) => (
                                <tr key={i}
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <td style={td}><span style={{ fontWeight: 600 }}>{m.MonthDisplay}</span></td>
                                    <td style={{ ...td, color: 'var(--secondary)' }}>{formatCurrency(m.DeliveryAmount)}</td>
                                    <td style={{ ...td, color: '#ef4444' }}>{formatCurrency(m.CommissionDeduction)}</td>
                                    <td style={{ ...td, color: '#eab308' }}>{formatCurrency(m.LoanDeduction)}</td>
                                    <td style={{ ...td, color: 'var(--accent)' }}>{formatCurrency(m.InputsDeduction)}</td>
                                    <td style={{ ...td, color: '#ef4444' }}>{formatCurrency(m.TotalDeductions)}</td>
                                    <td style={{
                                        ...td, fontWeight: 700,
                                        color: m.NetPayment >= 0 ? 'var(--secondary)' : '#ef4444',
                                    }}>{formatCurrency(m.NetPayment)}</td>
                                    <td style={td}><StatusBadge status={m.PaymentStatus} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
}

const td: React.CSSProperties = {
    padding: '12px',
    fontSize: '13px',
    color: '#c9d1d9',
};

const S: Record<string, React.CSSProperties> = {
    profileHeader: {
        background: 'rgba(22, 27, 34, 0.65)',
        backdropFilter: 'blur(16px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    headerBgAccent: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--primary), var(--accent), var(--secondary))',
    },
    profileTop: {
        display: 'flex',
        alignItems: 'center',
        gap: '28px',
    },
    avatarWrap: {
        position: 'relative',
        flexShrink: 0,
    },
    avatar: {
        width: '110px', height: '110px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid rgba(139, 124, 246, 0.25)',
        boxShadow: '0 8px 24px rgba(139, 124, 246, 0.15)',
    },
    onlineDot: {
        position: 'absolute',
        bottom: '6px', right: '6px',
        width: '16px', height: '16px',
        borderRadius: '50%',
        border: '3px solid var(--base-200)',
    },
    profileInfo: {
        flex: 1,
    },
    profileIdRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '6px',
    },
    profileId: {
        fontSize: '12px',
        fontWeight: 700,
        color: 'var(--primary)',
        background: 'rgba(139, 124, 246, 0.1)',
        border: '1px solid rgba(139, 124, 246, 0.2)',
        padding: '3px 10px',
        borderRadius: '6px',
    },
    profileName: {
        fontSize: '26px',
        fontWeight: 800,
        color: '#f0f6fc',
        marginBottom: '10px',
        letterSpacing: '-0.3px',
    },
    profileMeta: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '13px',
        color: '#8b949e',
    },
    earningsBox: {
        textAlign: 'right',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '14px',
        padding: '20px 24px',
    },
    earningsLabel: {
        fontSize: '10px',
        fontWeight: 700,
        color: '#484f58',
        letterSpacing: '1.5px',
        marginBottom: '8px',
    },
    earningsValue: {
        fontSize: '30px',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: '6px',
    },
    earningsSub: {
        fontSize: '11px',
        color: '#484f58',
    },
};
```

## frontend/src/pages/farmers/FarmersList.tsx

```tsx
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, UserPlus, MapPin, Search } from 'lucide-react';
import type { Farmer } from '../../types';
import { farmersAPI } from '../../api';
import FarmerCard from '../../components/common/FarmerCard';
import StatCard from '../../components/common/StatCard';
import FarmerForm from '../../components/forms/FarmerForm';


gsap.registerPlugin(ScrollTrigger);

export default function FarmersList() {
    const [farmers, setFarmers] = useState<Farmer[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editFarmer, setEditFarmer] = useState<Farmer | null>(null);

    useEffect(() => { load(); }, []);

    const load = async () => {
        try {
            const data = await farmersAPI.getAll() as Farmer[];
            setFarmers(data);
            setLoading(false);
            setTimeout(() => ScrollTrigger.refresh(), 200);
        } catch { setLoading(false); }
    };

    const filtered = farmers.filter(f =>
        f.FarmerName.toLowerCase().includes(search.toLowerCase()) ||
        f.FarmerId.toLowerCase().includes(search.toLowerCase()) ||
        f.Location.toLowerCase().includes(search.toLowerCase())
    );

    const grouped = filtered.reduce((acc, f) => {
        if (!acc[f.Location]) acc[f.Location] = [];
        acc[f.Location].push(f);
        return acc;
    }, {} as Record<string, Farmer[]>);

    const locations = Object.keys(grouped).sort();
    const males = farmers.filter(f => f.Gender === 'Male').length;
    const females = farmers.filter(f => f.Gender === 'Female').length;
    const avgAge = farmers.length
        ? Math.round(farmers.reduce((a, f) => a + f.Age, 0) / farmers.length) : 0;

    if (loading) {
        return (
            <div style={S.loading}>
                <div style={S.spinner} />
                <p style={{ color: 'var(--text-muted)' }}>Loading farmers...</p>
            </div>
        );
    }

    return (
        <div>
            {/* Stats */}
            <div style={S.statsGrid}>
                <StatCard title="Total Farmers" value={farmers.length}
                    subtitle={`${locations.length} locations`}
                    icon={Users} color="#8b7cf6" delay={0} />
                <StatCard title="Male Farmers" value={males}
                    subtitle={`${farmers.length ? ((males / farmers.length) * 100).toFixed(0) : 0}%`}
                    icon={Users} color="#3b82f6" delay={0.1} />
                <StatCard title="Female Farmers" value={females}
                    subtitle={`${farmers.length ? ((females / farmers.length) * 100).toFixed(0) : 0}%`}
                    icon={Users} color="#ec4899" delay={0.2} />
                <StatCard title="Average Age" value={avgAge}
                    subtitle="years old"
                    icon={Users} color="#2dd4bf" delay={0.3} />
            </div>

            {/* Toolbar */}
            <div style={S.toolbar}>
                <div style={S.searchBox} className="glass-card">
                    <Search size={16} color="var(--text-faint)" />
                    <input
                        type="text"
                        placeholder="Search by name, ID, or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={S.searchInput}
                    />
                </div>
                <button className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    onClick={() => {
                            setEditFarmer(null);
                            setFormOpen(true);
                        }}
                >
                    <UserPlus size={16} />
                    <span>Add Farmer</span>
                </button>
                
            </div>

            {/* Grouped Cards */}
            {locations.map((loc) => (
                <div key={loc} style={S.group}>
                    <div style={S.groupHeader}>
                        <div style={S.groupDot} />
                        <MapPin size={15} color="var(--primary)" />
                        <h2 style={S.groupTitle}>{loc}</h2>
                        <span style={S.groupCount}>
                            {grouped[loc].length} farmer{grouped[loc].length > 1 ? 's' : ''}
                        </span>
                        <div style={S.groupLine} />
                    </div>
                    <div style={S.cardGrid}>
                        {grouped[loc]
                            .sort((a, b) => b.FarmerId.localeCompare(a.FarmerId))
                            .map((farmer, i) => (
                                <FarmerCard key={farmer.FarmerId} farmer={farmer} index={i} />
                            ))}
                    </div>
                </div>
            ))}
            {/* Farmer Form Modal */}
            <FarmerForm
                isOpen={formOpen}
                onClose={() => setFormOpen(false)}
                onSaved={() => {
                    load();
                    setTimeout(() => ScrollTrigger.refresh(), 300);
                }}
                editFarmer={editFarmer}
            />
        </div>
    );
}

const S: Record<string, React.CSSProperties> = {
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px',
        alignItems: 'stretch',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 18px',
        width: '380px',
        borderRadius: '12px',
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: '13px',
        color: 'var(--text-normal)',
        width: '100%',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    group: { marginBottom: '32px' },
    groupHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '16px',
    },
    groupDot: {
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: 'var(--primary)',
        boxShadow: '0 0 8px rgba(139, 124, 246, 0.4)',
    },
    groupTitle: {
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--text-bright)',
    },
    groupCount: {
        fontSize: '11px',
        fontWeight: 600,
        color: 'var(--text-faint)',
        background: 'rgba(255,255,255,0.04)',
        padding: '3px 10px',
        borderRadius: '8px',
        border: '1px solid var(--glass-border)',
    },
    groupLine: {
        flex: 1,
        height: '1px',
        background: 'var(--glass-border)',
        marginLeft: '8px',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '18px',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        gap: '16px',
    },
    spinner: {
        width: '40px', height: '40px',
        border: '3px solid var(--base-300)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
};
```

## frontend/src/types/index.ts

```ts
// Farmer
export interface Farmer {
    FarmerId: string;
    FarmerName: string;
    DateOfBirth: string;
    Age: number;
    Gender: string;
    Email: string | null;
    Location: string;
    Contact: string;
    EnrolmentDate: string;
    ProfilePicUrl: string | null;
    CreatedAt: string;
}

// Agent
export interface Agent {
    AgentId: string;
    AgentName: string;
    Contact: string;
    Location: string;
    CreatedAt: string;
}

// Factory
export interface Factory {
    FactoryId: string;
    FactoryName: string;
    Location: string;
    Contact: string;
    CreatedAt: string;
}

// Input
export interface Input {
    InputId: string;
    InputName: string;
    InputPrice: number;
    CreatedAt: string;
}

// Milk Quality
export interface MilkQuality {
    QualityId: string;
    Grade: string;
    PricePerLitre: number;
    CreatedAt: string;
}

// Loan
export interface Loan {
    LoanId: string;
    FarmerId: string;
    FarmerName: string;
    LoanAmount: number;
    RepaymentPeriod: number;
    DateBorrowed: string;
    CreatedAt: string;
}

// Delivery
export interface Delivery {
    DeliveryId: string;
    BatchRef: string;
    FarmerId: string;
    FarmerName: string;
    MilkQuantity: number;
    QualityId: string;
    Grade: string;
    RatePerLitre: number;
    FactoryId: string;
    FactoryName: string;
    DeliveryDate: string;
    Amount: number;
    CreatedAt: string;
}

// Input Purchase
export interface InputPurchase {
    PurchaseId: string;
    FarmerId: string;
    FarmerName: string;
    InputId: string;
    InputName: string;
    InputPrice: number;
    Quantity: number;
    PurchaseAmount: number;
    DateOfPurchase: string;
    CreatedAt: string;
}

// Sale
export interface Sale {
    SaleId: string;
    SaleDate: string;
    AgentId: string;
    AgentName: string;
    FarmerId: string;
    FarmerName: string;
    SaleAmount: number;
    Commission: number;
    CreatedAt: string;
}

// Statement
export interface MonthlyStatement {
    FarmerId: string;
    FarmerName: string;
    FarmerLocation: string;
    ProfilePicUrl: string | null;
    MonthDisplay: string;
    TxnMonth: string;
    TxnYear: number;
    TxnMonthNum: number;
    DeliveryCount: number;
    TotalLitres: number;
    DeliveryAmount: number;
    CommissionDeduction: number;
    LoanDeduction: number;
    InputsDeduction: number;
    TotalDeductions: number;
    NetPayment: number;
    PaymentStatus: 'Credit' | 'Deficit' | 'Zero';
}

// Lifetime Earnings
export interface LifetimeEarnings {
    FarmerId: string;
    FarmerName: string;
    FarmerLocation: string;
    FarmerContact: string;
    FarmerEmail: string | null;
    ProfilePicUrl: string | null;
    Age: number;
    Gender: string;
    EnrolmentDate: string;
    ActiveMonths: number;
    LifetimeDeliveries: number;
    LifetimeLitres: number;
    LifetimeDeliveryAmount: number;
    LifetimeCommission: number;
    LifetimeLoanDeductions: number;
    LifetimeInputsPurchased: number;
    LifetimeTotalDeductions: number;
    LifetimeNetEarnings: number;
    AvgMonthlyNetPayment: number;
    BestMonthEarning: number;
    WorstMonthEarning: number;
    MonthsInCredit: number;
    MonthsInDeficit: number;
}
```

## frontend/src/utils/animations.ts

```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: HTMLElement | null, delay = 0) => {
    if (!element) return;
    gsap.fromTo(element,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay, ease: 'power3.out' }
    );
};

export const staggerFadeIn = (selector: string, container: HTMLElement | null) => {
    if (!container) return;
    gsap.fromTo(
        container.querySelectorAll(selector),
        { y: 30, opacity: 0, scale: 0.96 },
        {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out'
        }
    );
};

export const scrollReveal = (element: HTMLElement | null, delay = 0) => {
    if (!element) return;
    gsap.set(element, { y: 50, opacity: 0 });
    ScrollTrigger.create({
        trigger: element,
        start: 'top 88%',
        onEnter: () => {
            gsap.to(element, {
                y: 0, opacity: 1,
                duration: 0.7, delay,
                ease: 'power3.out'
            });
        },
        once: true,
    });
};

export const counterAnimation = (
    element: HTMLElement | null,
    endValue: number,
    duration = 1.5,
    delay = 0
) => {
    if (!element) return;
    const obj = { val: 0 };
    gsap.to(obj, {
        val: endValue,
        duration,
        delay,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.val).toLocaleString();
        }
    });
};
```

## frontend/src/utils/formatCurrency.ts

```ts
export const formatCurrency = (amount: number): string => {
    return `Ksh. ${amount.toLocaleString('en-KE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
};

export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-KE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

export const formatLitres = (litres: number): string => {
    return `${litres.toLocaleString('en-KE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} L`;
};
```

## frontend/tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2023",
    "useDefineForClassFields": true,
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

## frontend/tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

## frontend/tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

## frontend/vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

## generate_pdf_source.js

```js
const fs = require('fs');
const path = require('path');

// Configuration
const targetDir = '.'; // Scans the entire root directory
const outputFile = 'combined_codebase.md';

// Folders you want to completely ignore
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'venv', '__pycache__']; 

// File types you want to include in the PDF. 
// Add your specific backend extensions here if they are different (e.g., '.py', '.go', '.java')
const allowedExtensions = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.html']; 

let outputContent = '# Project Source Code\n\n';

function walkDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);

    // Format path for display (convert Windows backslashes and remove leading './')
    let displayPath = currentPath.replace(/\\/g, '/');
    if (displayPath.startsWith('./')) {
        displayPath = displayPath.substring(2);
    }

    // Explicitly list empty folders
    if (items.length === 0) {
        // We only want to list it if it's not the root itself
        if (displayPath !== '.') {
            outputContent += `## ${displayPath}/\n\n*(Empty Directory)*\n\n`;
        }
        return;
    }

    for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Traverse if it's not in the ignore list and not a hidden folder (like .vscode)
            if (!ignoreDirs.includes(item) && !item.startsWith('.')) {
                walkDirectory(fullPath);
            }
        } else {
            const ext = path.extname(item);
            
            // Skip the script itself and the output file to prevent duplication
            if (item === 'generate-pdf-source.js' || item === outputFile) continue;

            if (allowedExtensions.includes(ext)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    let cleanFilePath = fullPath.replace(/\\/g, '/');
                    if (cleanFilePath.startsWith('./')) {
                        cleanFilePath = cleanFilePath.substring(2);
                    }
                    
                    outputContent += `## ${cleanFilePath}\n\n`;
                    outputContent += `\`\`\`${ext.substring(1) || 'text'}\n`;
                    outputContent += `${content}\n`;
                    outputContent += `\`\`\`\n\n`;
                } catch (err) {
                    console.error(`Could not read file ${fullPath}:`, err);
                }
            }
        }
    }
}

walkDirectory(targetDir);

fs.writeFileSync(outputFile, outputContent);
console.log(`✅ Success! All code and empty folders have been mapped to ${outputFile}`);
```

