import { LocalizedBlogData, LocalizedBlogContent } from './types'
import { POST_1_SLUG, POST_1_DATA, POST_1_CONTENT } from './post1'
import { POST_2_SLUG, POST_2_DATA, POST_2_CONTENT } from './post2'
import { POST_3_SLUG, POST_3_DATA, POST_3_CONTENT } from './post3'
import { POST_4_SLUG, POST_4_DATA, POST_4_CONTENT } from './post4'
import { POST_5_SLUG, POST_5_DATA, POST_5_CONTENT } from './post5'
import { POST_6_SLUG, POST_6_DATA, POST_6_CONTENT } from './post6'
import { POST_7_SLUG, POST_7_DATA, POST_7_CONTENT } from './post7'
import { POST_8_SLUG, POST_8_DATA, POST_8_CONTENT } from './post8'
import { POST_9_SLUG, POST_9_DATA, POST_9_CONTENT } from './post9'
import { POST_10_SLUG, POST_10_DATA, POST_10_CONTENT } from './post10'

export const ALL_MULTILINGUAL_BLOG_DATA: Record<string, Record<string, LocalizedBlogData>> = {
  [POST_1_SLUG]: POST_1_DATA,
  [POST_2_SLUG]: POST_2_DATA,
  [POST_3_SLUG]: POST_3_DATA,
  [POST_4_SLUG]: POST_4_DATA,
  [POST_5_SLUG]: POST_5_DATA,
  [POST_6_SLUG]: POST_6_DATA,
  [POST_7_SLUG]: POST_7_DATA,
  [POST_8_SLUG]: POST_8_DATA,
  [POST_9_SLUG]: POST_9_DATA,
  [POST_10_SLUG]: POST_10_DATA,
}

export const ALL_MULTILINGUAL_BLOG_CONTENTS: Record<string, Record<string, LocalizedBlogContent>> = {
  [POST_1_SLUG]: POST_1_CONTENT,
  [POST_2_SLUG]: POST_2_CONTENT,
  [POST_3_SLUG]: POST_3_CONTENT,
  [POST_4_SLUG]: POST_4_CONTENT,
  [POST_5_SLUG]: POST_5_CONTENT,
  [POST_6_SLUG]: POST_6_CONTENT,
  [POST_7_SLUG]: POST_7_CONTENT,
  [POST_8_SLUG]: POST_8_CONTENT,
  [POST_9_SLUG]: POST_9_CONTENT,
  [POST_10_SLUG]: POST_10_CONTENT,
}
