/// <reference types="cypress" />
import Page from '../../pages/page'
import DeviceWearerDetailsPage from '../../pages/deviceWearer/details'

context('Device Wearer Detail', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  it('should display the device wearers detail view', () => {
    cy.task('stubDeviceWearer')
    cy.signIn()
    cy.visit('/device-wearers/3fc55bb7-ba52-4854-be96-661f710328fc')

    Page.verifyOnPage(DeviceWearerDetailsPage)
  })

  // it('should display three device wearers in a data table', () => {
  //   cy.task('stubDeviceWearers')
  //   cy.signIn()
  //   cy.visit('/device-wearers')
  //
  //   const page = Page.verifyOnPage(DeviceWearerListPage)
  //
  //   page.dataTable().should('exist')
  //   page.dataTableBodyRows().should('have.lengthOf', 2)
  // })
  //
  // it('should display a warning when no results are returned', () => {
  //   cy.task('stubDeviceWearersEmptyResponse')
  //   cy.signIn()
  //   cy.visit('/device-wearers?search=')
  //
  //   const page = Page.verifyOnPage(DeviceWearerListPage)
  //
  //   page.dataTable().should('exist')
  //   page.dataTableBodyRows().should('have.lengthOf', 1)
  //   page.dataTableBodyRows().should('contain', 'No results matching search term')
  // })
})
