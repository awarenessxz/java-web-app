/**
 * Testing Announcement Feature
 */

describe('Testing Announcement Feature', () => {
    /*
    describe('Testing Announcement Page', () => {
        beforeEach(() => {
            cy.visit('/#/announcements');
        });

        it('url is correct', () => {
            cy.url().should('include', '/#/announcements');
        });

        it('renders with no announcements', () => {
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', []);
            cy.contains('h2', 'Announcements');
            cy.contains('No Data Available'); // should have no announcements in list
        });

        it('renders with some announcements', () => {
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                fixture: 'announcement_list.json',
            });
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []);
            // assertion
            cy.contains('Test Announcement 1'); // should have announcement 1 in list
            cy.contains('Test Announcement 2'); // should have announcement 2 in list
        });

        it('click on announcement to view content', () => {
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                fixture: 'announcement_list.json',
            });
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []);
            cy.getByDataTestId('islv_rootDiv').within(() => {
                cy.get('li').first().click(); // click on first announcement
            });
            cy.contains('[Advisory] Test Announcement 1'); // should display announcement title
        });
    });

     */

    describe('Testing Announcement Console', () => {
        beforeEach(() => {
            cy.visit('/#/admin/announcements');
        });

        /*
        it('url is correct', () => {
            cy.url().should('include', '/#/admin/announcements');
        });

        it('normal user should not be able to access', () => {
            cy.intercept('GET', '/api/web/user/info', {
                fixture: 'login_as_user.json',
            });
            cy.getByDataTestId('pageNotFound').contains('h2', '404 - Page Not Found');
        });*/

        describe('Admin User', () => {
            beforeEach(() => {
                cy.intercept('GET', '/api/web/user/info', {
                    fixture: 'login_as_admin.json',
                });
            });

            it('Announcement Console should load for admin user', () => {
                cy.contains('h2', 'Admin Announcement Console');
            });

            it('Announcements should have edit & delete button', () => {
                // Arrange
                cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                    fixture: 'announcement_list.json',
                });
                cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []);
                // Assert
                cy.getByDataTestId('islv_rootDiv').within(() => {
                    cy.get('li button').should('have.length', 4); // 2 buttons per announcements
                });
            });

            it('Click on announcements to view content - should have edit button', () => {
                // Arrange
                cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                    fixture: 'announcement_list.json',
                });
                cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []);
                cy.getByDataTestId('islv_rootDiv').within(() => {
                    cy.get('li').first().click(); // click on first announcement
                });
                // Assert
                cy.contains('[Advisory] Test Announcement 1'); // should display announcement title
            });
        });
    });
});
