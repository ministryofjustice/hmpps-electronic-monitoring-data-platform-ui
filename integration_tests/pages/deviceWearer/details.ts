import AuthenticatedPage from '../authenticatedPage'
import { PageElement } from '../page'

export default class DeviceWearerDetailsPage extends AuthenticatedPage {
  constructor() {
    super('Device wearer summary')
  }

  dataTable = (): PageElement => cy.get('.govuk-table')

  dataTableHeader = (): PageElement => this.dataTable().get('thead')

  dataTableHeaderRows = (): PageElement => this.dataTable().get('tr')

  dataTableBody = (): PageElement => this.dataTable().get('tbody')

  dataTableBodyRows = (): PageElement => this.dataTableBody().find('tr')

  summaryList = (): PageElement => cy.get('.govuk-summary-card')

  summaryListValues = (): PageElement => this.summaryList().find('div.govuk-summary-list__row')

  summaryListHeader = (): PageElement => cy.get('.govuk-summary-card__title')
}
