import { prisma } from '../src/adapter/prisma.adapter';

async function main() {
  await prisma.projectLink.deleteMany();
  await prisma.project.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.infoLink.deleteMany();
  await prisma.info.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        id: 1,
        text: 'project 1',
        title: 'project 1',
      },
      {
        id: 2,
        text: 'project 2',
        title: 'project 2',
      },
      {
        id: 3,
        text: 'project 3',
        title: 'project 3',
      }
    ]
  });

  await prisma.projectLink.createMany({
    data: [
      {
        title: 'link 1.1',
        link: '#',
        projectId: 1
      },
      {
        title: 'link 1.2',
        link: '#',
        projectId: 1
      },
      {
        title: 'link 2.1',
        link: '#',
        projectId: 2
      },
      {
        title: 'link 2.2',
        link: '#',
        projectId: 2
      },
      {
        title: 'link 3.1',
        link: '#',
        projectId: 3
      },
    ]
  });

  await prisma.certificate.createMany({
    data: [
      {
        title: 'certificate 1',
        link: '#'
      },
      {
        title: 'certificate 2',
        link: '#'
      },
      {
        title: 'certificate 3',
        imageUrl: 'image:',
        link: '#'
      },
    ]
  });

  await prisma.skill.createMany({
    data: [
      {
        title: 'skill 1',
        iconUrl: 'image',
      },
      {
        title: 'skill 2',
        iconUrl: 'image',
      },
      {
        title: 'skill 3',
        iconUrl: 'image',
      }
    ]
  });

  await prisma.info.create({
    data: {
      aboutMe: 'about me',
      subtitle: 'subtitle',
      title: 'title',
      links: {
        createMany: {
          data: [
            {
              title: 'link 1',
              link: '#'
            },
            {
              title: 'link 2',
              link: '#'
            },
            {
              title: 'link 3',
              link: '#'
            }
          ]
        }
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
