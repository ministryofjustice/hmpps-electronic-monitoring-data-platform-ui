/// <reference types="cypress" />
import Page from '../../pages/page'
import DeviceWearerDetailsPage from '../../pages/deviceWearer/details'

context('Device Wearer Detail', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
    cy.task('catchAll')

    cy.signIn()
  })

  it('should display the device wearers detail view', () => {
    cy.task('stubDeviceWearer')
    cy.task('stubDevices')
    cy.visit('/device-wearers/3fc55bb7-ba52-4854-be96-661f710328fc')

    Page.verifyOnPage(DeviceWearerDetailsPage)
  })

  it('should display two devices in a data table', () => {
    cy.task('stubDeviceWearer')
    cy.task('stubDevices')

    cy.visit('/device-wearers/3fc55bb7-ba52-4854-be96-661f710328fc')
    const page = Page.verifyOnPage(DeviceWearerDetailsPage)

    page.dataTable().should('exist')
    page.summaryList().should('exist')
    page.summaryListHeader().should('exist')
    page.summaryListHeader().contains('Device wearer summary')
    page.dataTableBodyRows().should('have.lengthOf', 2)
  })

  it('should display a warning when no device is found', () => {
    cy.task('stubDeviceWearer')
    cy.task('stubDevicesEmptyResponse')

    cy.visit('/device-wearers/3fc55bb7-ba52-4854-be96-661f710328fc')
    const page = Page.verifyOnPage(DeviceWearerDetailsPage)

    page.dataTable().should('exist')
    page.summaryList().should('exist')
    page.dataTableBodyRows().should('have.lengthOf', 1)
    page.dataTableBodyRows().should('contain', 'No results found')
  })

  it('should display a warning when device wearer is not found', () => {
    cy.task('stubDeviceWearerEmptyResponse')
    cy.task('stubDevicesEmptyResponse')

    cy.visit('/device-wearers/3fc55bb7-ba52-4854-be96-661f710328fc')
    const page = Page.verifyOnPage(DeviceWearerDetailsPage)

    page.dataTable().should('exist')
    page.summaryList().should('exist')
    page.dataTableBodyRows().should('have.lengthOf', 1)
    page.dataTableBodyRows().should('contain', 'No results found')
    page.summaryListValues().get('dd').first().should('contain', '')
  })
})
