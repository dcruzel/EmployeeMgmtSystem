\c employeecms_db;

-- Insert departments (based on Wicked themes)
INSERT INTO department(name)
VALUES 
    ('Emerald City Council'),
    ('Wizardry and Magic'),
    ('Flying Training Academy'),
    ('Animal Rights and Advocacy'),
    ('Wicked Public Relations'),
    ('Magical Research & Development'),
    ('Ozian Defense Force'),
    ('Education and Academia'),
    ('City Maintenance & Infras');

-- Insert roles
INSERT INTO role(title, salary, department_id)
VALUES 
    ('Supreme Wizard', 150000, 2),
    ('Mayor of Emerald City', 120000, 1),
    ('Chief Sorcerer', 130000, 2),
    ('Flying Trainer', 90000, 3),
    ('Head of Animal Advocacy', 95000, 4),
    ('Public Relations Director', 85000, 5),
    ('Magical Scientist', 100000, 6),
    ('Head of Ozian Defense', 110000, 7),
    ('Wicked Witch of the West', 120000, 7),
    ('Professor of Sorcery', 90000, 8),
    ('Infrastructure Manager', 80000, 9),
    ('Winged Monkey Trainer', 75000, 3),
    ('Animal Advocate', 70000, 4),
    ('Public Relations Officer', 65000, 5),
    ('Magical Technician', 85000, 6),
    ('Defense Strategist', 95000, 7),
    ('Emerald City Guard', 60000, 1);

-- Insert employees
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
    ('Oscar', 'Diggs', 18, NULL),  -- Supreme Wizard
    ('Glinda', 'Upland', 22, 1),  -- Mayor of Emerald City
    ('Elphaba', 'Thropp', 29, 1), -- Wicked Witch of the West
    ('Madame', 'Morrible', 23, 1), -- Chief Sorcerer
    ('Fiyero', 'Tiggular', 28, 2), -- Head of Ozian Defense
    ('Boq', 'Nessarose', 27, 2),  -- Emerald City Guard
    ('Nanny', 'Thropp', 30, NULL), -- Professor of Sorcery
    ('Chistery', 'Monkey', 32, 3), -- Winged Monkey Trainer
    ('Dr.', 'Dillamond', 25, NULL), -- Head of Animal Advocacy
    ('Averic', 'Lion', 33, 5),    -- Animal Advocate
    ('Shenshen', 'Marmalade', 34, 6), -- Public Relations Officer
    ('Crope', 'Glower', 26, 8),   -- Emerald City Guard
    ('Tibbett', 'Breeze', 25, 8), -- Magical Technician
    ('Frex', 'Thropp', 31, 2),    -- Infrastructure Manager
    ('Galinda', 'Arduenna', 34, NULL); -- Flying Trainer