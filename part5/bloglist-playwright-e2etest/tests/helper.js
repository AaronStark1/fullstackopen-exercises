const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByPlaceholder('Title').fill(blog.title)
    await page.getByPlaceholder('Author').fill(blog.author)
    await page.getByPlaceholder('Url').fill(blog.url)
    await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }