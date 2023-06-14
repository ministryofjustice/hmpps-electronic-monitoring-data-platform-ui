import Page from './page'

export default abstract class AuthenticatedPage extends Page {
  constructor(title: string) {
    super(title)
    this.checkPhaseBanner()
  }

  checkPhaseBanner(): void {
    cy.get('.govuk-phase-banner__content__tag').contains('Discovery')
  }
}
