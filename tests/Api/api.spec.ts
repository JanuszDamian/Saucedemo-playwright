import { test, expect, request } from '@playwright/test'

test.describe.parallel("API Testing", () => {
    const baseUrl = 'https://reqres.in/api'

    test("Simple API Test - Assert Response Status, positive test", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)        
    })

    test("Simple API Test - Assert Response Status, incorrect endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2invalid-endpoint`)
        expect(response.status()).toBe(404)
    })

    test("Get Request - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(3)
        expect(responseBody.data.email).toBeTruthy()
        expect(responseBody.data.first_name).toBe("Emma")
        expect(responseBody.data.last_name).toBeTruthy()
        console.log(responseBody)
    })

    test("Post Request - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 1100,
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1100)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("Post request - Login", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("Post Request - Login fail", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })
})