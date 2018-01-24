USE baggage_db;

INSERT INTO questions (field,threshold,question) VALUES
  (1,0,'Have you had trouble falling or staying asleep?'),
  (1,0,'Have you felt “keyed up,” “on edge,” or unusually tense more often than not?'),
  (2,0,'Do you feel hopeless about the future?'),
  (2,0,'Do you generally feel sad and unhappy?'),
  (3,0,'Do you often fidget or squirm when forced to sit down for an extended period of time?'),
  (3,0,'Do you often have difficulty concentrating on what people say to you, even when they are speaking to you directly?'),
	(4,0,'Have you experienced or been exposed to a traumatic event?'),
  (4,0,'Been constantly on guard, watchful, or easily startled?'),

  (1,20,'Over the last three months, have you felt excessively worried for more days than not? '),
  (1,20,'Has the worry you felt often seemed “irrational", or out of proportion with the situation, but beyond your control to “reason away?”'),
  (1,30,'Have you felt more tired than usual, even on days when you got adequate sleep?'),
  (1,30,'When you’ve felt worried over the past three months, have you experienced tightness in your chest, shortness of breath, a pounding heart, or a feeling of choking?'),
  (1,40,'Over a three-month span, have you experienced persistent muscle tension or muscle aches without any increased or altered physical activity that might explain it? '),
  (1,50,'Over a three-month span, have you experienced persistent nausea, diarrhea, or irritable bowel syndrome without any dietary changes that might explain it? '),

  (2,20,'Did you used to be high-energy, but now it’s almost impossible to get out of bed in the morning?'),
  (2,20,'Do you find difficulty finding pleasure or joy in life?'),
  (2,30,'Do you constantly feel irritable in your own skin? Does it make you continually uncomfortable?'),
  (2,30,'Do simple tasks that you used to do seem hard to do lately?'),
  (2,40,'Even when reading a book that would usually interest you, do you find yourself reading the same paragraph over and over, and then lose interest after a couple of pages?'),
  (2,50,'Has your productivity declined so much lately that you feel you will get in trouble, or be fired by your boss any day?'),

  (3,20,''),
  (3,20,''),
  (3,30,''),
  (3,30,''),
  (3,40,''),
  (3,50,''),

  (4,20,'During the traumatic event did you feel intense fear, helplessness, and/or horror?'),  
  (4,20,'During the traumatic event, did you experience or witness serious injury or death, or the threat of injury or death?'),
  (4,30,'Have you had nightmares about the event(s), or thought about the event(s) when you did not want to?'),
  (4,30,'Do you try hard not to think about the event(s), or went out of your way to avoid situations that reminded you of the event(s)?'),
  (4,40,'Have you felt numb or detached from people, activities, or your surroundings?'),
  (4,50,'Have you felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?')
;


INSERT INTO specialties (spec_name) VALUES
  ("Anxiety"),
	("Depression"),
	("ADHD"),
	("PTSD")
;

