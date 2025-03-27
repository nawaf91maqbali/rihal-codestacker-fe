\c postgres;

CREATE TABLE crimes (
    id SERIAL PRIMARY KEY,
    national_id BIGINT,
    report_details TEXT,
    crime_type VARCHAR(50),
    report_date_time VARCHAR(20),
    report_status VARCHAR(50),
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7)
);


INSERT INTO crimes (national_id, report_details, crime_type, report_date_time, report_status, latitude, longitude) VALUES
(86597452, 'A group of masked individuals were seen breaking into a store.', 'Robbery', '2025-03-08-14-30', 'Under Investigation', 23.588, 58.3829),
(265612544, 'Loud screaming heard from an abandoned building.', 'Assault', '2025-03-08-18-45', 'Pending', 23.5955, 58.4096),
(98261541, 'A person with a firearm spotted near a school.', 'Homicide', '2025-03-08-09-15', 'En Route', 23.61, 58.491),
(94521564, 'A child was taken by an unknown individual near the park.', 'Kidnapping', '2025-03-08-22-10', 'On Scene', 23.6205, 58.4378),
(865545452, 'Suspicious activity reported near a bank after closing hours.', 'Robbery', '2025-03-08-01-05', 'Resolved', 23.5821, 58.4617),
(64512145, 'A vehicle was stolen from a parking lot.', 'Theft', '2025-03-07-23-30', 'Under Investigation', 24.3643, 56.7462),
(156266151, 'A group of individuals forcefully entered a warehouse and stole equipment.', 'Robbery', '2025-03-07-19-15', 'Pending', 24.3548, 56.7044),
(98854154, 'A person was attacked outside a shopping mall.', 'Assault', '2025-03-06-15-50', 'Under Investigation', 17.0204, 54.0897),
(954154545, 'An altercation at a sports event resulted in serious injuries.', 'Assault', '2025-03-06-12-10', 'Pending', 22.9333, 57.5333),
(36594515, 'A drive-by shooting was reported in a remote village.', 'Homicide', '2025-03-06-08-30', 'En Route', 22.926, 57.5301),
(78255632, 'An armed robbery occurred at a jewelry store.', 'Robbery', '2025-03-05-21-45', 'Resolved', 24.1781, 56.3038),
(12546225, 'A child was kidnapped from a playground.', 'Kidnapping', '2025-03-05-17-10', 'On Scene', 23.6005, 57.9231),
(148656202, 'A man was fatally shot in a private residence.', 'Homicide', '2025-03-05-14-00', 'Under Investigation', 23.5849, 58.3874),
(398416544, 'A violent altercation broke out at a marketplace.', 'Assault', '2025-03-04-20-20', 'Pending', 23.5852, 58.3906),
(78454545, 'A luxury car was stolen from a hotel parking lot.', 'Theft', '2025-03-04-06-45', 'Resolved', 22.5663, 59.5289),
(11220015, 'This is a test for date time report', 'Theft', '2025-03-24-13-27', 'Pending', 15.8827338, 44.5872490);