import AuthenticatedPage from '../authenticatedPage'
import { PageElement } from '../page'

export default class DeviceDetailsPage extends AuthenticatedPage {
  constructor() {
    super('Device summary')
  }

  dataTable = (): PageElement => cy.get('.govuk-table')

  dataTableHeader = (): PageElement => this.dataTable().get('thead')

  dataTableHeaderRows = (): PageElement => this.dataTable().get('tr')

  dataTableBody = (): PageElement => this.dataTable().get('tbody')

  dataTableBodyRows = (): PageElement => this.dataTableBody().find('tr')

  summaryList = (): PageElement => cy.get('.govuk-summary-card')

  summaryListHeader = (): PageElement => cy.get('.govuk-summary-card__title')

  dateLabel = (): PageElement => cy.get('label')

  submitButton = (): PageElement => cy.get('input[type=submit]')

  startDate = (): PageElement => cy.get('#startDate')

  endDate = (): PageElement => cy.get('#endDate')
}
