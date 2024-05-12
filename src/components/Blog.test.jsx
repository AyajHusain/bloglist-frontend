import { screen, render } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { describe } from 'vitest'

describe('<Blog />', () => {
    const blog  = {
        author:'Ayaj',
        title:'testing blog',
        url:'https://testingblog.com/',
        likes:0,
        user:{
            id:2311465465498546
        }
    }

    test('author and title are rendered by default', () => {
        const {container} = render(
          <Blog blog = {blog}/>
        )
      
        const div = container.querySelector('.author-title')
        expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
    })

    test('url and number of likes is shown' , async () => {
        const {container} = render(<Blog blog = {blog}/>)
        
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
    
        const div = container.querySelector('.full-details')
        expect(div).toHaveTextContent(blog.likes,blog.url)
    
    })

    test('like button clicked' , async () => {

        const likeUpdate = vi.fn()
    
        render(<Blog blog = {blog} likeUpdate={likeUpdate}/>)
    
        const user = userEvent.setup()
        const viewBtn = screen.getByText('view')
        await user.click(viewBtn)
    
        const likeBtn = screen.getByText('like')
        await user.click(likeBtn)
        await user.click(likeBtn)
        
        expect(likeUpdate.mock.calls).toHaveLength(2)
    
    })
})





