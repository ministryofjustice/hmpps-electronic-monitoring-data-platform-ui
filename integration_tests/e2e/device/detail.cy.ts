/// <reference types="cypress" />
import Page from '../../pages/page'
import DeviceDetailsPage from '../../pages/device/details'

context('Device Detail', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('catchAll')
    cy.signIn()
  })

  it('should display the device detail view', () => {
    cy.task('stubDevice')
    cy.task('stubLocations')
    cy.visit('/device/3fc55bb7-ba52-4854-be96-661f710328fc/d064e527-284d-4fc0-bda7-6295f1f7c8f4')

    Page.verifyOnPage(DeviceDetailsPage)
  })

  it('should display four locations in a data table', () => {
    cy.task('stubDevice')
    cy.task('stubLocations')

    cy.visit('/device/3fc55bb7-ba52-4854-be96-661f710328fc/d064e527-284d-4fc0-bda7-6295f1f7c8f4')
    const page = Page.verifyOnPage(DeviceDetailsPage)

    page.dataTable().should('exist')
    page.summaryList().should('exist')
    page.summaryListHeader().should('exist')
    page.summaryListHeader().contains('Device summary')
    page.dataTableBodyRows().should('have.lengthOf', 4)
  })

  it('should display a warning when no location is found', () => {
    cy.task('stubDevice')
    cy.task('stubLocationsEmptyResponse')

    cy.visit('/device/3fc55bb7-ba52-4854-be96-661f710328fc/d064e527-284d-4fc0-bda7-6295f1f7c8f4')
    const page = Page.verifyOnPage(DeviceDetailsPage)

    page.dataTable().should('exist')
    page.summaryList().should('exist')
    page.dataTableBodyRows().should('have.lengthOf', 1)
    page.dataTableBodyRows().should('contain', 'No matching results')
  })

  it('submit should reload the page passing start and end date', () => {
    cy.task('stubDevice')
    cy.task('stubLocations')

    cy.visit('/device/3fc55bb7-ba52-4854-be96-661f710328fc/d064e527-284d-4fc0-bda7-6295f1f7c8f4')
    const page = Page.verifyOnPage(DeviceDetailsPage)

    page.submitButton().click()

    cy.location('search').should('eq', '?startDate=&endDate=')
  })

  it('submit should reload the page passing start and end date', () => {
    cy.task('stubDevice')
    cy.task('stubLocations')

    cy.visit('/device/3fc55bb7-ba52-4854-be96-661f710328fc/d064e527-284d-4fc0-bda7-6295f1f7c8f4')
    const page = Page.verifyOnPage(DeviceDetailsPage)
    page.startDate().invoke('attr', 'value', '2023-07-21T18:13')
    page.endDate().invoke('attr', 'value', '2024-07-21T18:13')
    page.submitButton().click()

    cy.location('search').should('eq', '?startDate=2023-07-21T18%3A13&endDate=2024-07-21T18%3A13')
  })
})
