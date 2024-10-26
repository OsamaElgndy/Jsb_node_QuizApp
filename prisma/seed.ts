import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { da, faker } from '@faker-js/faker';
async function main() {



  //  startr  prisma faker 
  for (let index = 0; index < 20; index++) {


    await prisma.instructor.createMany({
      data: {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles : "Instructor"

      }
    })
    await prisma.student.createMany({
      data: {
        phone: faker.phone.number(),
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        roles : "Student"
      }
    })
    await prisma.course.createMany({
      data: {
        name: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        instructorId: index + 1
      }
    })


      await prisma.quiz.createMany({
        data: {
          name: faker.lorem.words(),
          description: faker.lorem.paragraph(),
          courseId: index + 1
        }
      
      })
      await prisma.question.createMany({
        data: {
          question: faker.lorem.words(),
          answer: faker.lorem.words(),
          quizId: index + 1
        }
      })
      console.log("done")
    }
  }



main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })