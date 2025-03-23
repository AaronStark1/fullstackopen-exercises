const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')
      
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'www.testurl.com'
      }
      await createBlog(page, blog)
      await expect(page.getByText('Test Title Test Author')).toBeVisible()
    })

    describe('When logged in and a new blog is created', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        const blog = {
          title: 'Test Title',
          author: 'Test Author',
          url: 'www.testurl.com'
        }
        await createBlog(page, blog)
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.locator('.blog-likes')).toContainText('likes: 1')
      })

      test('a blog can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Test Title Test Author')).not.toBeVisible()
      })

      test('only the creator of the blog can see the remove button', async ({ page, request }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
        
        await page.getByRole('button', { name: 'logout' }).click()
        
        await request.post('/api/users', {
          data: {
            name: 'Test User',
            username: 'testuser',
            password: 'testuser'
          }
        })
        
        await loginWith(page, 'testuser', 'testuser')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test("blogs are arranged in the order according to the likes", async ({ page, request }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
      
        const blogs = [
          { title: "Blog 1", author: "Author 1", url: "url1", likes: 5 },
          { title: "Blog 2", author: "Author 2", url: "url2", likes: 15 },
          { title: "Blog 3", author: "Author 3", url: "url3", likes: 10 },
        ];
      
        const token = await page
          .evaluate(() => localStorage.getItem("loggedBlogListAppUser"))
          .then((userString) => userString && JSON.parse(userString).token)
      
        for (const blog of blogs) {
          await request.post("/api/blogs", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: blog,
          })
        }
      
        await page.reload()
        await page.waitForTimeout(3000)
      
        //  Extract only the title (removing author & "view" text)
        const blogTitles = await page.evaluate(() =>
          Array.from(document.querySelectorAll(".blog-title")).map(el => el.childNodes[0].textContent.trim())
        )
      
      
        expect(blogTitles.length).toBe(blogs.length)
      
        //  Sort blogs by likes and extract titles
        const sortedBlogTitles = blogs
          .sort((a, b) => b.likes - a.likes)
          .map((b) => b.title)
      
        expect(blogTitles).toEqual(sortedBlogTitles)
      })
      

    })
  })
})
