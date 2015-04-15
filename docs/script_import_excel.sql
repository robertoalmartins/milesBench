insert into businesspartner
(name,registration_code,partner_type,email,phone_number,status)
(SELECT cliente, cpf, 'P', email, telefone_contato, 'A' FROM `import_cards_gol`);

insert into businesspartner
(name,registration_code,partner_type,email,phone_number,status)
(SELECT cliente, cpf, 'P', email, telefone_contato, 'A' FROM `import_cards_azul`
 where cpf not in (select registration_code from businesspartner));

insert into businesspartner
(name,registration_code,partner_type,email,phone_number,status)
(SELECT distinct cliente, cpf, 'P', email, telefone_contato, 'A' FROM `import_cards_tam`
 where cpf not in (select registration_code from businesspartner));

insert into cards
(card_number,access_password,access_id,recovery_password,airline_id,businesspartner_id)
(select numero_fidelidade, senha_multiplus, assinatura_eletronica, senha_resgate, 1, (select id from businesspartner where registration_code = cpf) from `import_cards_tam`);

insert into cards
(card_number,access_password,airline_id,businesspartner_id)
(select numero_cartao, senha, 2, (select id from businesspartner where registration_code = cpf) from `import_cards_gol`);

insert into cards
(card_number,access_password,airline_id,businesspartner_id)
(select numero_cartao, senha, 2, (select id from businesspartner where registration_code = cpf) from `import_cards_azul`);

INSERT INTO `milesbench`
(`leftover`, `lastchange`, `cards_id`, `due_date`, `cost_per_thousand`, `contract_due_date`, `total_card_leftover`) 
(select total, STR_TO_DATE(data_compra,'%m/%d/%Y'), cards.id, STR_TO_DATE(vencimento,'%m/%d/%Y'), valor_por_mil, ADDDATE(STR_TO_DATE(data_compra,'%m/%d/%Y'),45), null
 from import_cards_tam, cards
 where numero_fidelidade = card_number
   and total > 0);

INSERT INTO `milesbench`
(`leftover`, `lastchange`, `cards_id`, `due_date`, `cost_per_thousand`, `contract_due_date`, `total_card_leftover`) 
(select `real`, STR_TO_DATE(data_compra,'%m/%d/%Y'), cards.id, STR_TO_DATE(expirar,'%m/%d/%Y'), valor_por_mil, ADDDATE(STR_TO_DATE(data_compra,'%m/%d/%Y'),45), null
 from import_cards_gol, cards
 where numero_cartao = card_number
   and `real` > 0);

INSERT INTO `milesbench`
(`leftover`, `lastchange`, `cards_id`, `due_date`, `cost_per_thousand`, `contract_due_date`, `total_card_leftover`) 
(select `real`, STR_TO_DATE(data_compra,'%m/%d/%Y'), cards.id, null, valor_por_mil, ADDDATE(STR_TO_DATE(data_compra,'%m/%d/%Y'),45), null
 from import_cards_azul, cards
 where numero_cartao = card_number
   and `real` > 0);