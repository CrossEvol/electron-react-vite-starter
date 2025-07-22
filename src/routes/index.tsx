import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card' // 导入 Card 组件
import type { HonoPaths } from '@/schemas/openapi3/openapi.schema.d'
import fetchClient from '@/utils/fetch.client'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react' // 导入 useState
import ProTip from '../ProTip'

type UserResponse =
  HonoPaths['/posts']['get']['responses'][200]['content']['application/json']

function Copyright() {
  return (
    <p className="text-muted-foreground text-center text-sm">
      {'Copyright © '}
      <a href="https://ui.shadcn.com/" className="underline">
        Your Website
      </a>{' '}
      {new Date().getFullYear()}.
    </p>
  )
}

function Home() {
  const [posts, setPosts] = useState<UserResponse['data'] | null>(null) // 添加 posts 状态

  const handleHttpRequest = async () => {
    try {
      const res = await fetchClient.get<UserResponse>(
        `http://localhost:${localStorage.getItem('port')}/posts`
      )
      console.log(res)
      setPosts(res.data) // 请求成功后设置 posts 状态
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts(null) // 请求失败时清空数据
    }
  }

  const resetHttpRequestResult = async () => {
    setPosts(null)
  }

  return (
    <div className="container mx-auto sm:max-w-sm">
      <div className="my-4">
        <h1 className="mb-2 text-2xl font-semibold">
          Shadcn UI Vite.js example
        </h1>
        <Button onClick={handleHttpRequest}>Test HttpRequest</Button>
        {posts != null ? (
          <Button
            variant="secondary"
            className="ml-4"
            onClick={resetHttpRequestResult}
          >
            Reset
          </Button>
        ) : (
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        )}
        <ProTip />

        {/* 显示帖子数据 */}
        {posts && posts.length > 0 && (
          <div className="mt-8 grid gap-4">
            <h2 className="text-xl font-semibold">Fetched Posts:</h2>
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle>{post.title || 'No Title'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post.content || 'No Content'}</p>
                  {post.comments && post.comments.length > 0 && (
                    <div className="text-muted-foreground mt-4 text-sm">
                      <strong>Comments:</strong>
                      <ul>
                        {post.comments.map((comment) =>
                          comment ? (
                            <li key={comment.id}>- {comment.text}</li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Copyright />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})
