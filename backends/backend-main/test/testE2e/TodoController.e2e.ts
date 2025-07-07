import {ITestApp, testSetupUtil} from '../TestSetupUtil'
import * as request from 'supertest'

describe('TodoController E2E Tests', () => {
  let testApp: ITestApp

  beforeEach(async () => {
    testApp = await testSetupUtil.startTestApp()
  })

  afterEach(async () => {
    await testSetupUtil.closeApp(testApp)
  })

  describe('POST /todos', () => {
    test('should create a new todo', async () => {
      const todoDto = {
        title: 'Test Todo',
      }
      const response = await request(testApp.app.getHttpServer())
        .post('/todos')
        .send(todoDto)

      expect(response.statusCode).toBe(201)
      expect(response.body.id).toBeGreaterThan(0)
      expect(response.body.title).toBe(todoDto.title)
    })
  })
})
