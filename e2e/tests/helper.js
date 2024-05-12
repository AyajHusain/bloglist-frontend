const loginWith = async(page,username,password) => {
    await page.getByRole('button',{name:'login'}).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button',{name:'submit'}).click()
}

const createNote = async (page,title,author,url) => {
    await page.getByRole('button',{name:'new blog'}).click()
    const inputs = await page.getByRole('textbox').all()
    await inputs[0].fill(title)
    await inputs[1].fill(author)
    await inputs[2].fill(url)
    await page.getByRole('button',{name:'create'}).click()
    await page.getByText(`${title} ${author} view`).waitFor(5000)

}

const likeIncrement = async (page)=>{
    await page.getByRole('button',{name:'view'}).click()
    await page.getByRole('button',{name:'like'}).click()
}

const multipleLike = async (page,author,title,m) => {
    await createNote(page,title,author,`http://${title}${author}.com/`)
    await page.getByText(`${title} ${author} view`).getByRole('button',{name:'view'}).click()
    const currentLikes = await page.getByText(`${title} ${author} hide`)
    let numberOfLikes = Number(await currentLikes.locator('.LiKe').textContent())
    for(let i = 0; i < m; i++ ){
        await page.getByRole('button',{name:'like'}).click()
        numberOfLikes += 1
        await page.getByText(String(numberOfLikes)).waitFor()
    }
    await page.getByRole('button',{name:'hide'}).click()
}

module.exports = {loginWith,createNote,likeIncrement,multipleLike}