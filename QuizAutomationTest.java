import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;
import java.util.List;

public class QuizAutomationTest {

    public static void main(String[] args) throws InterruptedException {

        // Selenium Manager will handle ChromeDriver automatically
        WebDriver driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.manage().window().maximize();

        // IMPORTANT: update this path if your file location is different
        driver.get("file:///C:/Users/rohin/OneDrive/Desktop/Quiz/index.html");

        System.out.println("URL: " + driver.getCurrentUrl());
        System.out.println("Title: " + driver.getTitle());

        // Select difficulty
        driver.findElement(By.id("levelSelect")).sendKeys("Easy");

        // Click Start Quiz
        driver.findElement(By.id("startBtn")).click();
        Thread.sleep(2000);

        // Answer all questions
        while (true) {
            List<WebElement> options = driver.findElements(By.name("option"));

            if (options.size() == 0) {
                break; // quiz finished
            }

            options.get(0).click(); // select first option
            Thread.sleep(500);

            driver.findElement(By.id("nextBtn")).click();
            Thread.sleep(1500);
        }

        // Check result screen
        if (driver.findElement(By.id("result-screen")).isDisplayed()) {
            System.out.println("Result screen displayed successfully");
        }

        Thread.sleep(3000);
        driver.quit();
    }
}
