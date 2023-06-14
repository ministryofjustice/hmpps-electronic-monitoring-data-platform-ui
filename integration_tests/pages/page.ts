export type PageElement = Cypress.Chainable<JQuery>

export default abstract class Page {
  static verifyOnPage<T>(constructor: new () => T): T {
    return new constructor()
  }

  constructor(private readonly title: string) {
    this.checkOnPage()
    this.checkPhaseBanner()
  }

  checkOnPage(): void {
    cy.get('h1').contains(this.title)
  }

  checkPhaseBanner(): void {
    cy.get('.govuk-phase-banner__content__tag').contains('Discovery')
  }

  signOut = (): PageElement => cy.get('[data-qa=signOut]')

  manageDetails = (): PageElement => cy.get('[data-qa=manageDetails]')
}
