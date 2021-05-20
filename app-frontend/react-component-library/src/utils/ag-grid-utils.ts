import { LicenseManager } from 'ag-grid-enterprise';

const setAgGridLicense = (key: string): void => {
    LicenseManager.setLicenseKey(key);
};

export default { setAgGridLicense };
