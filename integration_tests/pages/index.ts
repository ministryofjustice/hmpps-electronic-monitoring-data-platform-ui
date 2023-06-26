import AuthenticatedPage from './authenticatedPage'
import { PageElement } from './page'

export default class IndexPage extends AuthenticatedPage {
  constructor() {
    super('This site is under construction...')
  }

  headerUserName = (): PageElement => cy.get('[data-qa=header-user-name]')
}
