import AuthenticatedPage from '../authenticatedPage'
import { PageElement } from '../page'

export default class DeviceWearerListPage extends AuthenticatedPage {
  constructor() {
    super('Device Wearers')
  }

  dataTable = (): PageElement => cy.get('.govuk-table')

  dataTableHeader = (): PageElement => this.dataTable().get('thead')

  dataTableHeaderRows = (): PageElement => this.dataTable().get('tr')

  dataTableBody = (): PageElement => this.dataTable().get('tbody')

  dataTableBodyRows = (): PageElement => this.dataTableBody().find('tr')
}
