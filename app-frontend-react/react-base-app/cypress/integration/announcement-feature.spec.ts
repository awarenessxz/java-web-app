/**
 * Testing Announcement Feature
 */

describe('Testing Announcement Feature', () => {
    describe('Testing Announcement Page', () => {
        beforeEach(() => {
            cy.visit('/#/announcements');
        });


    });

    describe('Testing Announcement Console', () => {
        beforeEach(() => {
            cy.visit('/#/admin/announcements');
        });

        describe('Admin User', () => {
            beforeEach(() => {
                cy.intercept('GET', '/api/web/user/info', {
                    fixture: 'login_as_admin.json',
                });
            });

            it('Announcement Console should load for admin user', () => {
                cy.contains('h2', 'Admin Announcement Console');
            });
        });

        describe('Normal User', () => {
            beforeEach(() => {
                cy.intercept('GET', '/api/web/user/info', {
                    fixture: 'login_as_user.json',
                });
            });

            it("Non-Admin Users shouldn't be able to access", () => {
                cy.getByDataTestId('pageNotFound').contains('h2', '404 - Page Not Found');
            });
        });
    });
});
