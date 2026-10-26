import path from 'node:path'

import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { type ReactNode } from 'react'

import {
  PRINT_COLOR,
  PRINT_FONT,
  PRINT_LEADING,
  PRINT_SPACE,
  PRINT_STROKE,
  PRINT_TRACKING,
  PRINT_TYPE,
} from '@/design-system/tokens'
import { type Translator } from '@/i18n'
import { type Models } from '@/models'

import { formatPeriod } from '@/lib/format-period'

const FONT_ROOT = path.join(process.cwd(), 'node_modules', '@fontsource')

const fontSource = (family: string, fontWeight: number) => ({
  src: path.join(FONT_ROOT, family, 'files', `${family}-latin-${fontWeight}-normal.woff`),
  fontWeight,
})

Font.register({
  family: PRINT_FONT.sans,
  fonts: [
    fontSource('geist-sans', 400),
    fontSource('geist-sans', 500),
    fontSource('geist-sans', 600),
  ],
})
Font.register({
  family: PRINT_FONT.mono,
  fonts: [fontSource('geist-mono', 400), fontSource('geist-mono', 500)],
})
Font.registerHyphenationCallback((word) => [word])

const styles = StyleSheet.create({
  page: {
    paddingVertical: PRINT_SPACE.pageY,
    paddingHorizontal: PRINT_SPACE.pageX,
    backgroundColor: PRINT_COLOR.paper,
    color: PRINT_COLOR.ink,
    fontFamily: PRINT_FONT.sans,
    fontSize: PRINT_TYPE.body,
    lineHeight: PRINT_LEADING.body,
  },
  header: {
    paddingBottom: PRINT_SPACE.block,
    borderBottomWidth: PRINT_STROKE.rule,
    borderBottomColor: PRINT_COLOR.rule,
    gap: PRINT_SPACE.item,
  },
  name: {
    fontSize: PRINT_TYPE.name,
    fontWeight: 600,
    letterSpacing: PRINT_TRACKING.name,
    lineHeight: PRINT_LEADING.tight,
  },
  role: { fontSize: PRINT_TYPE.role, fontWeight: 500, color: PRINT_COLOR.accent },
  meta: { fontSize: PRINT_TYPE.meta, color: PRINT_COLOR.muted },
  section: { marginTop: PRINT_SPACE.section, gap: PRINT_SPACE.block },
  sectionTitle: {
    paddingBottom: PRINT_SPACE.item,
    borderBottomWidth: PRINT_STROKE.hairline,
    borderBottomColor: PRINT_COLOR.hairline,
    fontFamily: PRINT_FONT.mono,
    fontSize: PRINT_TYPE.label,
    fontWeight: 500,
    letterSpacing: PRINT_TRACKING.label,
    textTransform: 'uppercase',
    color: PRINT_COLOR.muted,
  },
  entry: { gap: PRINT_SPACE.item },
  entryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: PRINT_SPACE.block,
  },
  entryTitle: { fontSize: PRINT_TYPE.title, fontWeight: 600 },
  entryDate: { fontFamily: PRINT_FONT.mono, fontSize: PRINT_TYPE.meta, color: PRINT_COLOR.muted },
  entryContext: { color: PRINT_COLOR.muted },
  company: { color: PRINT_COLOR.accent, fontWeight: 500 },
  bullets: { gap: PRINT_SPACE.item },
  bullet: { flexDirection: 'row' },
  bulletMark: { width: PRINT_SPACE.bulletIndent, color: PRINT_COLOR.muted },
  bulletText: { flex: 1 },
  row: { flexDirection: 'row', gap: PRINT_SPACE.block },
  rowLabel: { width: PRINT_SPACE.labelColumn, color: PRINT_COLOR.muted },
  rowValue: { flex: 1 },
  muted: { color: PRINT_COLOR.muted },
  strong: { fontWeight: 600 },
  link: { color: PRINT_COLOR.muted, textDecoration: 'none' },
})

const META_SEPARATOR = '  ·  '

const linksOf = (project: Models.Project): Models.ResumeLink[] =>
  project.source ? [project.link, project.source] : [project.link]

type SectionProps = {
  title: string
  children: ReactNode
}

const Section = ({ title, children }: SectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle} minPresenceAhead={48}>
      {title}
    </Text>
    {children}
  </View>
)

const Bullets = ({ items }: { items: readonly string[] }) => (
  <View style={styles.bullets}>
    {items.map((item) => (
      <View key={item} style={styles.bullet}>
        <Text style={styles.bulletMark}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
)

type CvDocumentProps = {
  resume: Models.Resume
  locale: Models.Locale
  t: Translator
}

export const CvDocument = ({ resume, locale, t }: CvDocumentProps) => {
  const { profile } = resume
  const contactLinks = [profile.email, profile.website, profile.linkedin, profile.github]

  return (
    <Document
      title={t('cv.documentTitle', { name: profile.name })}
      author={profile.name}
      subject={profile.role}
      keywords={resume.skills.flatMap((group) => group.items).join(', ')}
      creator={profile.website.label}
      producer={profile.website.label}
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
          <Text style={styles.meta}>
            {[profile.location, profile.availability, profile.citizenship].join(META_SEPARATOR)}
          </Text>
          <Text style={styles.meta}>
            {contactLinks.map((link, index) => (
              <Text key={link.href}>
                {index > 0 ? META_SEPARATOR : ''}
                <Link src={link.href} style={styles.link}>
                  {link.label}
                </Link>
              </Text>
            ))}
          </Text>
        </View>

        <Section title={t('cv.summary')}>
          <Text>{profile.summary}</Text>
        </Section>

        <Section title={t('cv.experience')}>
          {resume.positions.map((position) => (
            <View key={position.id} style={styles.entry}>
              <View style={styles.entryHead}>
                <Text style={styles.entryTitle}>{position.role}</Text>
                <Text style={styles.entryDate}>
                  {formatPeriod({
                    start: position.start,
                    end: position.end,
                    locale,
                    presentLabel: t('cv.present'),
                    style: 'month',
                  })}
                </Text>
              </View>
              <Text style={styles.entryContext}>
                <Text style={styles.company}>{position.company}</Text>
                {`${META_SEPARATOR}${position.location}${META_SEPARATOR}${position.context}`}
              </Text>
              <Bullets items={position.highlights} />
            </View>
          ))}
        </Section>

        {resume.earlier.length > 0 ? (
          <Section title={t('cv.earlier')}>
            {resume.earlier.map((position) => (
              <View key={position.id} style={styles.entry} wrap={false}>
                <View style={styles.entryHead}>
                  <Text>
                    <Text style={styles.strong}>{position.role}</Text>
                    <Text style={styles.muted}>{`${META_SEPARATOR}${position.company}`}</Text>
                  </Text>
                  <Text style={styles.entryDate}>
                    {formatPeriod({
                      start: position.start,
                      end: position.end,
                      locale,
                      presentLabel: t('cv.present'),
                      style: 'month',
                    })}
                  </Text>
                </View>
                <Text>{position.summary}</Text>
              </View>
            ))}
          </Section>
        ) : null}

        <Section title={t('cv.projects')}>
          {resume.projects.map((project) => (
            <View key={project.id} style={styles.entry} wrap={false}>
              <View style={styles.entryHead}>
                <Text>
                  <Text style={styles.strong}>{project.name}</Text>
                  <Text style={styles.muted}>{`${META_SEPARATOR}${project.status}`}</Text>
                </Text>
                <Text style={styles.entryDate}>
                  {linksOf(project).map((link, index) => (
                    <Text key={link.href}>
                      {index > 0 ? META_SEPARATOR : ''}
                      <Link src={link.href} style={styles.link}>
                        {link.label}
                      </Link>
                    </Text>
                  ))}
                </Text>
              </View>
              <Text>{project.summary}</Text>
            </View>
          ))}
        </Section>

        <Section title={t('cv.skills')}>
          <View style={styles.entry}>
            {resume.skills.map((group) => (
              <View key={group.id} style={styles.row} wrap={false}>
                <Text style={styles.rowLabel}>{group.label}</Text>
                <Text style={styles.rowValue}>{group.items.join(', ')}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title={t('cv.education')}>
          <View style={styles.entry}>
            {resume.education.map((item) => (
              <View key={item.id} style={styles.entryHead} wrap={false}>
                <Text>
                  <Text style={styles.strong}>{item.title}</Text>
                  {item.status ? <Text style={styles.muted}>{` (${item.status})`}</Text> : null}
                </Text>
                <Text
                  style={styles.entryDate}
                >{`${item.institution}${META_SEPARATOR}${item.period}`}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title={t('cv.languages')}>
          <Text>
            {resume.languages.map((language, index) => (
              <Text key={language.id}>
                {index > 0 ? META_SEPARATOR : ''}
                <Text style={styles.strong}>{language.name}</Text>
                <Text style={styles.muted}>{` ${language.level}`}</Text>
              </Text>
            ))}
          </Text>
        </Section>
      </Page>
    </Document>
  )
}
