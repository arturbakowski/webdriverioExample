class GlobalPage {
    async openPage(pageUrl: string, expectedPageUrl: string) {
        await browser.url(pageUrl);
        await expect(browser).toHaveUrl(expectedPageUrl)
        await $("#rodo-ok").click()
    }
}

export default new GlobalPage();