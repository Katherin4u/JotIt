const { Builder, By } = require('selenium-webdriver');
const { login } = require('./helper');

async function runTest() {
    // Set up the Selenium WebDriver
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // login
        await login('demo@user.io', 'password', driver);
        await driver.manage().setTimeouts({ implicit: 3000 });

        // Click the 'All tasks' button
        await driver.findElement(By.className('task-link')).click();

        // assert expected tasks exist
        const elements = await driver.findElements(By.css('.container-task'));
        const textArray = [];
        const expectedText = ['First Task', 'Second Task', 'Third Task']
        for (const element of elements) {
            const firstDivAfterElement = await element.findElement(By.css('div'));
            const text = await firstDivAfterElement.getText();
            textArray.push(text);
        }

        // assertion
        if (JSON.stringify(expectedText) !== JSON.stringify(textArray)) {
            console.log('Assertion Failed: Expected tasks did not appear')
        } else {
            console.log('Assertion Passed: Expected tasks appear')
        }

        // close browser
        await driver.quit();
    } catch (error) {
        console.error('An error occurred:', error);
        // Handle or log any errors encountered during the test
        await driver.quit();
    }
}

runTest();
