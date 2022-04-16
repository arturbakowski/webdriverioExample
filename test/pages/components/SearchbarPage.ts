class SearchBarPage {
    get searchInput() {
        return $("#inputSearch")
    }

    get searchIcon() {
        return $("//button[contains(text(), 'Szukaj')]");
    }

    get suggestPopup() {
        return $("form#szukanie div.suggest-list");
    }

    get seeAllBooksBtn() {
        return $("li.wszystkie > p > a");
    }

    get notFoundAlert() {
        return $("div.not-found")
    }

    async getNotFoundAlertText(): Promise<string> {
        const alert: WebdriverIO.Element = await this.notFoundAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }

    async clearSearchBar() {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        await input.clearValue();
        await expect(input).toHaveValue("")
    }

    async getInputValue(): Promise<string> {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        return await input.getValue()
    }

    async clickOnSeeAllBooksBtn() {
        const btn:WebdriverIO.Element = await this.seeAllBooksBtn;
        await btn.waitForDisplayed();
        await btn.click();
    }

    async suggestPopupIsVisible() {
        const popup:WebdriverIO.Element = await this.suggestPopup;
        await popup.waitForDisplayed();
    }

    async typeSearchPhrase(value: string) {
        const input:WebdriverIO.Element = await this.searchInput
        await input.waitForDisplayed();
        await input.setValue(value);
        await expect(input).toHaveValue(value);
    }

    async clickOnSearchIcon() {
        const icon:WebdriverIO.Element = await this.searchIcon;
        await icon.waitForDisplayed();
        await icon.click();
    }

    async searchBarIsVisible() {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        await expect(await input.isDisplayed()).toBeTruthy();
    }
}

export default new SearchBarPage();