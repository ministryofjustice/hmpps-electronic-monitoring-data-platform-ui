import AuthenticatedPage from '../authenticatedPage'
import { PageElement } from '../page'

export default class DeviceWearerDetailsPage extends AuthenticatedPage {
  constructor() {
    super('John Smith')
  }

  dataTable = (): PageElement => cy.get('.govuk-table')

  dataTableHeader = (): PageElement => this.dataTable().get('thead')

  dataTableHeaderRows = (): PageElement => this.dataTable().get('tr')

  dataTableBody = (): PageElement => this.dataTable().get('tbody')

  dataTableBodyRows = (): PageElement => this.dataTableBody().find('tr')
}
