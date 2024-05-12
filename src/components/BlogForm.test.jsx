import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('making sure eventHandler is being with right data', async() => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(
    <BlogForm createBlog={createBlog}/>
    )

    const input = screen.getAllByRole('textbox')
    const button = screen.getByText('create')

    await user.type(input[0],'title testing')
    await user.type(input[1],'author Ayaj')
    await user.type(input[2],'url https://testingAyaj.com/')

    await user.click(button)

    expect(createBlog.mock.calls[0][0]).toStrictEqual({
        title: 'title testing',
        author: 'author Ayaj',
        url: 'url https://testingAyaj.com/'
      })
})