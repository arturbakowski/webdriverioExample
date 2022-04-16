import { searchPhrase } from "../../config/data";
import { helionHomeUrl } from "../../config/pagesUrl"
import CartPage from "../../pages/CartPage";
import SearchBarPage from "../../pages/components/SearchbarPage"
import GlobalPage from "../../pages/GlobalPage";
import ProductPage from "../../pages/ProductPage";
import SearchResultPage from "../../pages/SearchResultPage";

describe("E2E - Products", async () => {
    let productTitle: string = ''
    let price: string = ''

    before(() => {
        GlobalPage.openPage(helionHomeUrl, helionHomeUrl)
    });

    it("Should type search phrase and click search icon", async () => {
        await SearchBarPage.typeSearchPhrase(searchPhrase);
        await SearchBarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrlContaining("Testowanie");
    })

    it("Should click on first book", async () => {
        await SearchResultPage.clickFirstBook();
        await ProductPage.addToCartBtnIsVisible();
        await ProductPage.productTitleIsVisibile();
        productTitle = await ProductPage.getProductTitleValue();
        price = await ProductPage.getProductPrice();
    })

    it("Should click on add to cart button", async () => {
        await ProductPage.clickOnAddToCartBtn();
        await expect(browser).toHaveUrlContaining("/zakupy");
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        await expect(await CartPage.getTotalPriceValue()).toContain(price)
    })

    it("Should delete product from cart", async () => {
        await CartPage.clickCheckbox();
        await CartPage.clickUsunZaznaczone();
        //@ts-ignore
        await expect(await browser.getAlertText()).toContain("Czy jesteś pewien usunięcia wybranych pozycji z koszyka?");
        await CartPage.acceptDeleteAlert();
        await expect(await CartPage.getDeletedAlertMessageValue()).toContain("Twój koszyk jest pusty")
    })
})