/**
 *
 * Testing Announcement Feature
 *
 */

describe('Testing Announcement Feature', () => {
    /*
    describe('Testing Announcement Page', () => {

    });
     */

    describe('Testing Announcement Console for Admin Users', () => {
        beforeEach(() => {
            cy.visit('/#/admin/announcements');
            cy.intercept('GET', '/api/web/user/info', {
                fixture: 'login_as_admin.json',
            });
        });

        it('Announcement Console should load for admin user', () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

        });
    });

    /*
    describe('Testing Announcement Console for Normal Users', () => {
        beforeEach(() => {
            cy.visit('/#/admin/announcements');
            cy.intercept('GET', '/api/web/user/info', {
                fixture: 'login_as_user.json',
            });
        });

        it("Non-Admin Users shouldn't be able to access", () => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            cy.getByDataTestId('pageNotFound')
        });
    });
    */
});
