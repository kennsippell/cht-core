const commonPage = require('@page-objects/default/common/common.wdio.page');
const modalPage = require('@page-objects/default/common/modal.wdio.page');

const languageDropDown = () => $('#language');

const openEditSettings = async () => {
  await commonPage.openEditProfile();
  //modals have an animation and the click might land somewhere else
  await browser.pause(500);
};

const selectLanguage = async (code) => {
  await languageDropDown().waitForDisplayed();
  await browser.waitUntil(async () => {
    const options = await languageDropDown().$$('option');
    const values = await options.map(opt => opt.getAttribute('value'));
    return values.includes(code);
  }, {
    timeout: 10000,
    timeoutMsg: `Language option with value "${code}" not found in dropdown after 10s`
  });
  await languageDropDown().selectByAttribute('value', code);
  await modalPage.submit();
};

const setLanguage = async (code) => {
  await commonPage.waitForPageLoaded();
  await commonPage.openHamburgerMenu();
  await commonPage.openUserSettings();
  await openEditSettings();
  await selectLanguage(code);
  await browser.pause(500); // wait for the elements to change translations
};

module.exports = {
  openEditSettings,
  setLanguage,
};
