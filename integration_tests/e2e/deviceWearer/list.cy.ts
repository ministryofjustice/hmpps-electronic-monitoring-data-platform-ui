/// <reference types="cypress" />
import DeviceWearerListPage from '../../pages/deviceWearer/list'
import Page from '../../pages/page'

context('Device Wearer List', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('should display the device wearers view', () => {
    cy.task('stubDeviceWearers')
    cy.signIn()
    cy.visit('/device-wearers')

    Page.verifyOnPage(DeviceWearerListPage)
  })

  it('should display three device wearers in a data table', () => {
    cy.task('stubDeviceWearers')
    cy.signIn()
    cy.visit('/device-wearers')

    const page = Page.verifyOnPage(DeviceWearerListPage)

    page.dataTable().should('exist')
    page.dataTableBodyRows().should('have.lengthOf', 2)
  })

  it('should display a warning when no results are returned', () => {
    cy.task('stubDeviceWearersEmptyResponse')
    cy.signIn()
    cy.visit('/device-wearers?search=')

    const page = Page.verifyOnPage(DeviceWearerListPage)

    page.dataTable().should('exist')
    page.dataTableBodyRows().should('have.lengthOf', 1)
    page.dataTableBodyRows().should('contain', 'No results matching search term')
  })
})
