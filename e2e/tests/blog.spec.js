const {test,describe,expect,beforeEach} = require('@playwright/test')
const {loginWith,createNote,likeIncrement,multipleLike} = require('./helper')

describe('blog app', () => {
    beforeEach(async({page,request})=>{
        await request.post('/api/testing/reset')
        await request.post('/api/users',{
            data:{
                name:'Ayaj Husain',
                username:'Ayaj',
                password:'greatAdventure'
            }
        })
        await page.goto('/')
    })
    test('login form is shown', async ({page}) => {
        await page.getByRole('button',{name:'login'}).click()
        await expect(page.locator('.loginForm')).toBeVisible()
    })

    describe('Login',()=>{
        test('succeeds with correct credential', async({page}) => {
            await loginWith(page,'Ayaj','greatAdventure')
            await expect(page.getByText('Ayaj is logged-in')).toBeVisible()
        })
        test('fails with wrong credentials', async({page}) => {
            await loginWith(page,'Ayaj','wrong')
            await expect(page.getByText('wrong username or password')).toBeVisible()
        })

        describe('When logged in',() => {
            beforeEach(async({page}) => {
                await loginWith(page,'Ayaj','greatAdventure')
            })
    
            test('a new blog', async({page}) => {
                await createNote(
                    page,
                    'a great night',
                    'John doe','http://agreatnight.com/'
                )
                await expect(page.getByText('a great night John doe view')).toBeVisible()
            })

            describe('When a note is created',() => {
                beforeEach(async({page})=>{
                    await createNote(
                        page,
                        'a great night',
                        'John doe','http://agreatnight.com/'
                    )
                })

                test('increasing likes',async({page})=>{
                    await likeIncrement(page)
                    await expect(page.getByText('1 like')).toBeVisible()
                })

                test('logged user can delete', async({page})=>{
                    await page.getByRole('button',{name:'view'}).click()
                    page.on('dialog',dialog=>dialog.accept())
                    await page.getByRole('button',{name:'remove'}).click()
                    await expect(page.getByText('a great night John doe')).not.toBeVisible()
                })

                describe('When two users',()=>{
                    beforeEach(async({request})=>{
                        request.post('/api/users',{
                            data:{
                                name:'Arsh Husain',
                                username:'Arsh',
                                password:'notsogreatAdventure'
                            }
                        })
                    })

                    test('second user can not', async({page})=>{
                        await page.getByRole('button',{name:'view'}).click()
                        await expect(page.getByText('remove')).toBeVisible()

                        await page.getByRole('button',{name:'log out'}).click()
                        await loginWith(page,'Arsh','notsogreatAdventure')
                        await expect(page.getByText('remove')).not.toBeVisible()
                    })

                    describe('Many blogs',()=>{
                        beforeEach(async({page})=>{
                            await multipleLike(page,'mike','second',3)
                            await multipleLike(page,'Ayaj','third',2)
                            
                        })
                        test('in descending order', async({page})=>{
                           const blogs = await page.locator('.full-details').all()
                           for(let i = 0; i<blogs.length-1; i++){
                                const likeCurrent = await blogs[i].locator('.LiKe').textContent()
                                const likeNext = await blogs[i+1].locator('.LiKe').textContent()
                                expect(Number(likeCurrent)).toBeGreaterThanOrEqual(Number(likeNext))
                           }
                        })
                    })
                })
            })
        })
    })
})