DROP TABLE questionResult;
DROP TABLE lessonResult;
DROP TABLE question;
DROP TABLE lesson;
DROP TABLE users;

create table if not exists users (
	id serial primary key,
	username varchar(320) unique,
	email varchar(320) unique,
	phoneNumber char(11),
	password varchar(320),
    gender varchar(50),
    nationality varchar(50)
);

create table if not exists lesson (
	id serial primary key,
	name varchar(320),
    type varchar(320),
    image varchar(1000)
);

create table if not exists question (
	id serial primary key,
	content text,
	lessonId integer,
	foreign key (lessonId) references lesson(id)
);

create table if not exists lessonResult (
	id serial primary key,
	studentId integer,
	lessonId integer,
	finishedTime timestamp,
	averageScore float,
	feedback text,
	foreign key (lessonId) references lesson(id),
	foreign key (studentId) references users(id)
);


create table if not exists questionResult (
	id serial primary key, 
	studentId integer, 
	lessonResultId integer, 
	questionId integer,
	ieltsBand float,
	accuracy float,
	fluency float, 
	completeness float,
	pronunciation float,
	feedback text, 
	foreign key (lessonResultId) references lessonResult(id),
	foreign key (questionId) references question(id),
	foreign key (studentId) references users(id)
);

create table if not exists incorrectphonemes (
	id serial primary key, 
	phoneme varchar(5),
	questionResultId integer,
	lessonResultId integer, 
	questionId integer,
	studentId integer,
    incorrect_count integer.
	foreign key (questionResultId) references questionResult(id), 
	foreign key (lessonResultId) references lessonResult(id),
	foreign key (questionId) references question(id),
	foreign key (studentId) references users(id)
);

insert into lesson (name, type, image) values
('Technology', 'speaking', 'https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/02a90a0b65e66df0963f1b5477527d2ac1445187?placeholderIfAbsent=true'),
('Environment', 'speaking', 'https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/1236d1d71bbeb3c3824f8ab88eb5159654b5e4d1?placeholderIfAbsent=true'),
('Education', 'speaking', 'https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/50ce905aa9a969e7683a8822bd451ce918855619?placeholderIfAbsent=true'),
('Health', 'speaking', 'https://cdn.builder.io/api/v1/image/assets/d09fa83e4ab04468bd9329558cd49375/ddc2f9e7faf4c399e595e15ab3f987f8785f338f?placeholderIfAbsent=true'),
('Travel', 'speaking', 'https://assico.ae/wp-content/uploads/2024/11/Travel-1-01.webp'),
('Love', 'speaking', 'https://videos.openai.com/vg-assets/assets%2Ftask_01jvq9mchze1t8kjsp7x6es8rp%2F1747759836_img_1.webp?st=2025-05-20T15%3A46%3A14Z&se=2025-05-26T16%3A46%3A14Z&sks=b&skt=2025-05-20T15%3A46%3A14Z&ske=2025-05-26T16%3A46%3A14Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=2hQFHVbkzqPHSUwaVomp7GdV5pPc2WZp8dipc2fwcks%3D&az=oaivgprodscus');

-- Questions for lessonId = 1 (Technology)
INSERT INTO question (content, lessonId) VALUES
('Technology plays an important role in our daily life.', 1),
('Artificial intelligence is transforming the world.', 1),
('Social media has both positive and negative impacts.', 1),
('We rely on smartphones for almost everything.', 1),
('The Internet has revolutionized communication.', 1),
('Technology in education makes learning more accessible.', 1),
('Cybersecurity is crucial in the digital age.', 1),
('Online shopping has become increasingly popular.', 1),
('Automation is changing the job market.', 1);

-- Questions for lessonId = 2 (Environment)
INSERT INTO question (content, lessonId) VALUES
('Climate change is a global concern.', 2),
('We must reduce carbon emissions.', 2),
('Deforestation affects biodiversity.', 2),
('Plastic pollution is harming marine life.', 2),
('Renewable energy is the future.', 2),
('Protecting wildlife is essential.', 2),
('Recycling helps save the environment.', 2),
('Water conservation is necessary.', 2),
('Green technology is being developed rapidly.', 2);

-- Questions for lessonId = 3 (Education)
INSERT INTO question (content, lessonId) VALUES
('Education is the foundation of a strong society.', 3),
('Online learning is becoming more common.', 3),
('Teachers play a vital role in student development.', 3),
('Access to quality education is still unequal.', 3),
('Homework helps reinforce learning.', 3),
('Classrooms are integrating more technology.', 3),
('Standardized tests are widely debated.', 3),
('Lifelong learning is important.', 3),
('Curriculum reforms are needed.', 3);

-- Questions for lessonId = 4 (Health)
INSERT INTO question (content, lessonId) VALUES
('A balanced diet is essential for good health.', 4),
('Regular exercise improves physical fitness.', 4),
('Mental health should not be ignored.', 4),
('Vaccines help prevent diseases.', 4),
('Healthcare should be accessible to all.', 4),
('Smoking causes serious health problems.', 4),
('Sleep is important for brain function.', 4),
('Public health campaigns raise awareness.', 4),
('Obesity is a growing concern.', 4);

-- Questions for lessonId = 5 (Travel)
INSERT INTO question (content, lessonId) VALUES
('Travel broadens our perspective.', 5),
('Tourism can boost the economy.', 5),
('Cultural exchange happens through travel.', 5),
('Air travel is faster but less eco-friendly.', 5),
('Backpacking is popular among youth.', 5),
('Traveling solo builds confidence.', 5),
('Safety is important when traveling abroad.', 5),
('Travel blogs share unique experiences.', 5),
('Visa requirements vary by country.', 5);

-- Questions for lessonId = 6 (Love)
INSERT INTO question (content, lessonId) VALUES
('Love reflects a person’s deepest emotions.', 6),
('Music is a powerful expression of love.', 6),
('Love brings people closer together.', 6),
('Romantic gestures have symbolic meaning.', 6),
('True love should be cherished and protected.', 6),
('Love evolves through life experiences.', 6),
('Words are key to expressing love.', 6),
('Sharing meals can strengthen love.', 6),
('Love stories have been told for generations.', 6);
