module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Documents',
      [
        {
          title: 'It Started With A Converse',
          content: `One of the best ways of improving your English is to read 
          the language. This part of our site includes complete short stories 
          by some of the very best classic writers. All stories are complete 
          and unabridged. Read them online or print them off and read them 
          in bed! One new story is added to our site every month. 
          All stories are in the public domain and now copyright free.`,
          userId: 1,
          userRoleId: 1,
          access: 'public',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'The Wolf and the Lamb',
          content: `Wolf, meeting with a Lamb astray from the fold, resolved 
          not to lay violent hands on him, but to find some plea to justify 
          to the Lamb the Wolf's right to eat him. He thus addressed him: 
          "Sirrah, last year you grossly insulted me." "Indeed," bleated the 
          Lamb in a mournful tone of voice, "I was not then born." Then said 
          the Wolf, "You feed in my pasture." "No, good sir," replied the Lamb,
           "I have not yet tasted grass." Again said the Wolf, "You drink of 
           my well." "No," exclaimed the Lamb, "I never yet drank water, for 
           as yet my mother's milk is both food and drink to me." Upon 
           which the Wolf seized him and ate him up, saying, "Well! I won't 
           remain supper-less, even though you refute every one of my 
           imputations." The tyrant will always find a pretext for his tyranny.`,
          userId: 1,
          userRoleId: 1,
          access: 'public',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'The Ass and the Grasshopper',
          content: `An Ass having heard some Grasshoppers chirping, was highly
           enchanted; and, desiring to possess the same charms of melody, 
           demanded what sort of food they lived on to give them such beautiful 
           voices. They replied, "The dew." The Ass resolved that he would 
           live only upon dew, and in a short time died of hunger.`,
          userId: 2,
          userRoleId: 2,
          access: 'role',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('Documents', null, {})
};
