import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { faker } from '@faker-js/faker';
async function main() {



  //  startr  prisma faker 
  for (let index = 0; index <20 ;index++) {
    await prisma.instructor.createMany({
      data: {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        email: faker.internet.email(),
        password:faker.internet.password()

      }
    })

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