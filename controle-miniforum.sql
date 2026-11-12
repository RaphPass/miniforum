-- ============================================================
--  MiniForum -- contrôle de la base construite au TP
--
--  1. Dans phpMyAdmin, clique sur ta base miniforum_prenom
--     (à gauche) : elle doit être sélectionnée.
--  2. Onglet SQL : colle tout ce fichier, puis « Exécuter ».
--  3. Lis la dernière colonne : chaque ligne doit dire OK.
--     Une ligne KO ? La colonne « attendu » dit ce qui manque.
--
--  Ce fichier ne modifie rien : il ne fait que LIRE.
-- ============================================================
SELECT controle, attendu, obtenu,
       IF(obtenu = attendu, 'OK', 'KO') AS verdict
FROM (
  SELECT 1 AS n, 'les quatre tables' AS controle,
         'likes posts topics users' AS attendu,
         (SELECT GROUP_CONCAT(TABLE_NAME ORDER BY TABLE_NAME SEPARATOR ' ')
            FROM information_schema.TABLES
           WHERE TABLE_SCHEMA = DATABASE()
             AND TABLE_NAME IN ('users','topics','posts','likes')) AS obtenu
  UNION ALL
  SELECT 2, 'moteur InnoDB (4 tables)', '4',
         (SELECT COUNT(*) FROM information_schema.TABLES
           WHERE TABLE_SCHEMA = DATABASE() AND ENGINE = 'InnoDB'
             AND TABLE_NAME IN ('users','topics','posts','likes'))
  UNION ALL
  SELECT 3, 'interclassement utf8mb4_general_ci (4 tables)', '4',
         (SELECT COUNT(*) FROM information_schema.TABLES
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_COLLATION = 'utf8mb4_general_ci'
             AND TABLE_NAME IN ('users','topics','posts','likes'))
  UNION ALL
  SELECT 4, 'clés primaires (table : colonnes)',
         'likes:idUser,idPost posts:idPost topics:idTopic users:idUser',
         (SELECT GROUP_CONCAT(cle ORDER BY cle SEPARATOR ' ') FROM (
            SELECT CONCAT(TABLE_NAME, ':', GROUP_CONCAT(COLUMN_NAME ORDER BY ORDINAL_POSITION)) AS cle
              FROM information_schema.KEY_COLUMN_USAGE
             WHERE TABLE_SCHEMA = DATABASE() AND CONSTRAINT_NAME = 'PRIMARY'
               AND TABLE_NAME IN ('users','topics','posts','likes')
             GROUP BY TABLE_NAME) AS k)
  UNION ALL
  SELECT 5, 'AUTO_INCREMENT (A_I) sur les clés primaires', 'posts.idPost topics.idTopic users.idUser',
         (SELECT GROUP_CONCAT(CONCAT(TABLE_NAME, '.', COLUMN_NAME) ORDER BY TABLE_NAME SEPARATOR ' ')
            FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND EXTRA LIKE '%auto_increment%'
             AND TABLE_NAME IN ('users','topics','posts','likes'))
  UNION ALL
  SELECT 6, 'email unique (UNIQUE)', 'email',
         (SELECT GROUP_CONCAT(COLUMN_NAME) FROM information_schema.STATISTICS
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
             AND NON_UNIQUE = 0 AND INDEX_NAME <> 'PRIMARY')
  UNION ALL
  SELECT 7, 'colonnes qui acceptent NULL (aucune)', '0',
         (SELECT COUNT(*) FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND IS_NULLABLE = 'YES'
             AND TABLE_NAME IN ('users','topics','posts','likes'))
  UNION ALL
  SELECT 8, 'types des colonnes de texte',
         'contenu:text email:varchar(255) pseudo:varchar(50) titre:varchar(150)',
         (SELECT GROUP_CONCAT(CONCAT(COLUMN_NAME, ':', DATA_TYPE,
                   IF(DATA_TYPE = 'varchar', CONCAT('(', CHARACTER_MAXIMUM_LENGTH, ')'), ''))
                   ORDER BY COLUMN_NAME SEPARATOR ' ')
            FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE()
             AND COLUMN_NAME IN ('pseudo','email','titre','contenu'))
  UNION ALL
  SELECT 9, 'colonnes de nombres entiers (int)', '8',
         (SELECT COUNT(*) FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND DATA_TYPE = 'int'
             AND TABLE_NAME IN ('users','topics','posts','likes'))
  UNION ALL
  SELECT 10, 'cree_le : datetime, défaut CURRENT_TIMESTAMP (4 tables)', '4',
         (SELECT COUNT(*) FROM information_schema.COLUMNS
           WHERE TABLE_SCHEMA = DATABASE() AND COLUMN_NAME = 'cree_le'
             AND DATA_TYPE = 'datetime' AND LOWER(COLUMN_DEFAULT) LIKE 'current_timestamp%')
  UNION ALL
  SELECT 11, 'clés étrangères et leur ON DELETE',
         'likes.idPost>posts:CASCADE likes.idUser>users:CASCADE posts.idTopic>topics:CASCADE posts.idUser>users:RESTRICT topics.idUser>users:RESTRICT',
         (SELECT GROUP_CONCAT(CONCAT(k.TABLE_NAME, '.', k.COLUMN_NAME, '>', k.REFERENCED_TABLE_NAME, ':', r.DELETE_RULE)
                   ORDER BY k.TABLE_NAME, k.COLUMN_NAME SEPARATOR ' ')
            FROM information_schema.KEY_COLUMN_USAGE AS k
            JOIN information_schema.REFERENTIAL_CONSTRAINTS AS r
              ON r.CONSTRAINT_SCHEMA = k.TABLE_SCHEMA AND r.CONSTRAINT_NAME = k.CONSTRAINT_NAME
             AND r.TABLE_NAME = k.TABLE_NAME
           WHERE k.TABLE_SCHEMA = DATABASE() AND k.REFERENCED_TABLE_NAME IS NOT NULL)
  UNION ALL
  SELECT 12, 'lignes dans users', '10', (SELECT COUNT(*) FROM users)
  UNION ALL
  SELECT 13, 'lignes dans topics', '20', (SELECT COUNT(*) FROM topics)
  UNION ALL
  SELECT 14, 'lignes dans posts', '80', (SELECT COUNT(*) FROM posts)
  UNION ALL
  SELECT 15, 'lignes dans likes', '35', (SELECT COUNT(*) FROM likes)
  UNION ALL
  SELECT 16, 'messages sans contenu (texte vide)', '0',
         (SELECT COUNT(*) FROM posts WHERE TRIM(contenu) = '')
) AS c
ORDER BY n;
