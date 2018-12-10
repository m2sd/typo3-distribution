<?php
$EM_CONF[$_EXTKEY] = [
  'title' => 'M² solutions TYPO3 Distribution Site Package',
  'description' => 'The main distribution package to configure TYPO3',
  'category' => 'TYPO3 Console',
  'state' => 'stable',
  'uploadfolder' => 0,
  'createDirs' => '',
  'modify_tables' => '',
  'clearCacheOnLoad' => 0,
  'author' => 'Michael Marcenich',
  'author_email' => 'info@m-squared-solutions.it',
  'author_company' => 'M² solutions',
  'version' => '0.1.0',
  'constraints' => [
    'depends' => [
      'typo3' => '8.7.0-8.7.99',
      'realurl' => '2.4-2.99',
      'content_defender' => '3.0-3.99',
      'poi_map' => '1.3-1.99',
    ],
    'conflicts' => [
    ],
    'suggests' => [
    ],
  ],
];
