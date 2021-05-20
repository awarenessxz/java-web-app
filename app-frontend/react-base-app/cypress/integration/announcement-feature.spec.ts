// @ts-ignore
import moment from 'moment';

/**
 * Testing Announcement Feature
 */

describe('Testing Announcement Feature', () => {
    describe('Testing Announcement Page', () => {
        beforeEach(() => {
            cy.visit('/#/announcements');
        });

        it('url is correct', () => {
            cy.url().should('include', '/#/announcements');
        });

        it('renders with no announcements', () => {
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', []).as('getAnnouncements');
            cy.wait('@getAnnouncements');
            cy.contains('h2', 'Announcements');
            cy.contains('No Data Available'); // should have no announcements in list
        });

        it('renders with some announcements', () => {
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                fixture: 'announcement_list.json',
            }).as('getAnnouncements1');
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []).as('getAnnouncements2');
            cy.wait('@getAnnouncements1');
            cy.wait('@getAnnouncements2');
            // assertion
            cy.contains('Test Announcement 1'); // should have announcement 1 in list
            cy.contains('Test Announcement 2'); // should have announcement 2 in list
        });

        it('click on announcement to view content', () => {
            // arrange
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                fixture: 'announcement_list.json',
            }).as('getAnnouncements1');
            cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []).as('getAnnouncements2');
            cy.wait('@getAnnouncements1');
            cy.wait('@getAnnouncements2');
            // act
            cy.window().should('have.attr', 'testTinymceView'); // wait for tiny mce to be loaded
            cy.getByDataTestId('islv_rootDiv').within(() => {
                cy.getSelectorWithWaitUntil('li', 'firstListItem', 0).click(); // click on first item
            });
            // assert
            cy.contains('[Advisory] Test Announcement 1'); // should display announcement title
            cy.getTinyMceContent('tinymceEditor').then(($content) => {
                expect($content).to.have.string('This is a test content 1'); // should display announcement content
            });
        });
    });

    describe('Testing Announcement Console', () => {
        beforeEach(() => {
            cy.visit('/#/admin/announcements');
        });

        it('url is correct', () => {
            cy.url().should('include', '/#/admin/announcements');
        });

        it('normal user should not be able to access', () => {
            cy.intercept('GET', '/api/web/user/info', {
                fixture: 'login_as_user.json',
            }).as('getUserInfo');
            cy.wait('@getUserInfo');
            cy.getByDataTestId('pageNotFound').contains('h2', '404 - Page Not Found');
        });

        describe('Admin User', () => {
            beforeEach(() => {
                cy.intercept('GET', '/api/web/user/info', {
                    fixture: 'login_as_admin.json',
                }).as('getUserInfo');
                cy.wait('@getUserInfo');
            });

            it('Announcement Console should load for admin user', () => {
                cy.contains('h2', 'Admin Announcement Console');
            });

            describe('Testing Announcement List View', () => {
                it('Announcements items should have edit & delete button', () => {
                    // Arrange
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                        fixture: 'announcement_list.json',
                    }).as('getAnnouncements1');
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []).as('getAnnouncements2');
                    cy.wait('@getAnnouncements1');
                    cy.wait('@getAnnouncements2');
                    // Act & Assert
                    cy.window().should('have.attr', 'testTinymceView'); // wait for tiny mce to be loaded
                    cy.getByDataTestId('islv_rootDiv').within(() => {
                        // check first item
                        cy.get('li')
                            .first()
                            .within(($listItem) => {
                                const $buttons = $listItem.find('button');
                                const $editBtnLabel = $buttons[0].getAttribute('aria-label');
                                const $deleteBtnLabel = $buttons[1].getAttribute('aria-label');
                                cy.wrap($editBtnLabel).should('eq', 'edit');
                                cy.wrap($deleteBtnLabel).should('eq', 'delete');
                            });
                        // check second item (idx=2 because idx=1 & idx=3 is the divider)
                        cy.get('li')
                            .eq(2)
                            .within(($listItem) => {
                                const $buttons = $listItem.find('button');
                                const $editBtnLabel = $buttons[0].getAttribute('aria-label');
                                const $deleteBtnLabel = $buttons[1].getAttribute('aria-label');
                                cy.wrap($editBtnLabel).should('eq', 'edit');
                                cy.wrap($deleteBtnLabel).should('eq', 'delete');
                            });
                    });
                });

                it('Announcements items should have edit & delete button', () => {
                    // arrange
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                        fixture: 'announcement_list.json',
                    }).as('getAnnouncements1');
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []).as('getAnnouncements2');
                    cy.wait('@getAnnouncements1');
                    cy.wait('@getAnnouncements2');
                    // act
                    cy.getByDataTestId('islv_rootDiv').within(() => {
                        cy.getSelectorWithWaitUntil('li', 'firstListItem', 0).click();
                    });
                    // assert
                    cy.contains('[Advisory] Test Announcement 1'); // should display announcement title
                    cy.getTinyMceContent('tinymceEditor').then(($content) => {
                        expect($content).to.have.string('This is a test content 1'); // should display announcement content
                    });
                });

                it('Click on announcements to view content - should have content & edit button', () => {
                    // Arrange
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                        fixture: 'announcement_list.json',
                    }).as('getAnnouncements1');
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []).as('getAnnouncements2');
                    cy.wait('@getAnnouncements1');
                    cy.wait('@getAnnouncements2');
                    // act
                    cy.getByDataTestId('islv_rootDiv').within(() => {
                        cy.getSelectorWithWaitUntil('li', 'firstListItem', 0).click(); // click on first announcement
                    });
                    // assert
                    cy.contains('[Advisory] Test Announcement 1'); // should display announcement title
                    cy.window().should('have.attr', 'testTinymceView'); // wait for tiny mce to be loaded
                    cy.getTinyMceContent('tinymceEditor').then(($content) => {
                        expect($content).to.have.string('This is a test content 1'); // should display announcement content
                    });
                    cy.get('.euiPageContentHeader').within(() => {
                        cy.get('button').contains('Edit');
                    });
                });

                it('Click on Edit Announcement will bring user to populated editor page', () => {
                    // Arrange
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=0', {
                        fixture: 'announcement_list.json',
                    }).as('getAnnouncements1');
                    cy.intercept('GET', '/api/web/announcements/all/page?limit=5&offset=1', []).as('getAnnouncements2');
                    cy.wait('@getAnnouncements1');
                    cy.wait('@getAnnouncements2');
                    // act
                    cy.window().should('have.attr', 'testTinymceView'); // wait for tiny mce to be loaded
                    cy.getByDataTestId('islv_rootDiv').within(() => {
                        cy.getSelectorWithWaitUntil('li', 'firstListItem', 0).click(); // click on first announcement
                    });
                    cy.get('.euiPageContentHeader').within(() => {
                        cy.get('button').contains('Edit').click();
                    });
                    // assert
                    cy.window().should('have.attr', 'testTinymceEdit'); // wait for tiny mce to be loaded
                    cy.get('.euiPageContentBody').within(() => {
                        cy.getByDataTestId('createAnnouncementBtn').contains('Modify Announcement'); // modify announcement button exists
                        cy.getByDataTestId('deleteAnnouncementBtn').should('be.visible'); // delete button exists
                        cy.get('input').eq(0).should('have.value', 'Test Announcement 1'); // input title is rendered correctly
                        cy.get('input').eq(1).should('have.value', '24/01/2021'); // input start date is rendered correctly
                        cy.get('input').eq(2).should('have.value', '24/01/2021'); // input end date is rendered correctly
                        cy.get('select').contains('System Advisory');
                        cy.getTinyMceContent('tinymceEditor').then(($content) => {
                            expect($content).to.have.string('This is a test content 1'); // should display announcement content
                        });
                    });
                });
            });

            describe('Testing Announcement Editor View', () => {
                beforeEach(() => {
                    // go to editor tab
                    cy.get('.euiTabs').within(() => {
                        cy.get('button').contains('Editor').click();
                    });
                    cy.window().should('have.attr', 'testTinymceEdit'); // wait for tiny mce to be loaded
                });

                it('Editor View Renders Correctly', () => {
                    cy.get('.euiPageContentBody').within(() => {
                        cy.getByDataTestId('createAnnouncementBtn').contains('Create Announcement'); // modify announcement button exists
                        cy.getByDataTestId('deleteAnnouncementBtn').should('not.exist'); // delete button does not exists
                        cy.get('input').eq(0).should('have.value', ''); // input title is rendered correctly
                        const now = moment().format('DD/MM/YYYY');
                        cy.get('input').eq(1).should('have.value', now); // hard to test
                        cy.get('input').eq(2).should('have.value', now); // hard to test
                        cy.get('select').contains('System Advisory'); // default select option
                        cy.getTinyMceContent('tinymceEditor').then(($content) => {
                            expect($content).to.have.string(''); // should display announcement content
                        });
                    });
                });

                it('Create New Announcement Fail when empty', () => {
                    cy.get('.euiPageContentBody').within(() => {
                        cy.getByDataTestId('createAnnouncementBtn').contains('Create Announcement').click();
                        cy.contains('p', 'Creation of Announcement Failed!!');
                    });
                });

                it('Create New Announcement', () => {
                    cy.get('.euiPageContentBody').within(() => {
                        cy.get('input').eq(0).type('New Announcement Test');
                        cy.setTinyMceContent('tinymceEditor', 'New Announcement 123');
                        cy.getByDataTestId('createAnnouncementBtn').contains('Create Announcement').click();
                        // Assertion
                        cy.contains('p', 'Announcement created!');
                    });
                });
            });
        });
    });
});
