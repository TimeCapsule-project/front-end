import React, { Fragment } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  FlexStyle,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import { DateTimeType } from 'components/DateTimePickerModal';

export type PreviewData = {
  content?: string;
  date: DateTimeType;
  to: string;
  from: string;
  color: string;
}

type WriteCapsuleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WriteCapsulePreview'
>;

type WriteCapsuleScreenRouteProp = RouteProp<
  RootStackParamList,
  'WriteCapsulePreview'
>;

const PersonText = React.memo(
  ({
    label,
    person,
    aligh,
  }: { [key: string]: string } & { aligh?: FlexStyle['justifyContent'] }) => (
    <View
      style={[
        styles.personTextView,
        { justifyContent: aligh || 'flex-start' },
      ]}>
      <TemplateText familyType="power" style={styles.personLabel}>
        {label}
      </TemplateText>
      <TemplateText familyType="power" style={styles.person}>
        {person}
      </TemplateText>
    </View>
  ),
);

function WriteCapsule() {
  const navigation = useNavigation<WriteCapsuleScreenNavigationProp>();
  const { params } = useRoute<WriteCapsuleScreenRouteProp>();

  return (
    <Fragment>
      <RouteHeader
        label="타임 캡슐 미리보기"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.contentView}>
          <View>
            <TemplateText familyType="power" style={styles.usuableDateText}>
              {`${params.data?.date.date}. ${params.data?.date.time} 이후 개봉 가능`}
            </TemplateText>
            <PersonText person={params.data?.to} label="To. " />
            <TemplateText familyType="bold" style={styles.contentText}>
              {params.data?.content || '입력한 내용이 없습니다.'}
            </TemplateText>
          </View>
          <PersonText
            person={params.data?.from}
            label="From. "
            aligh="flex-end"
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => console.log('submit!')}>
          <TemplateText familyType="power" style={styles.submitButtonText}>
            {'캡슐 묻기'}
          </TemplateText>
        </TouchableOpacity>
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: yellow,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: yellow,
  },
  contentView: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 3,
    paddingBottom: 25,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  contentText: {
    padding: 12,
    fontSize: 18,
    color: darkBlue,
  },
  usuableDateText: {
    paddingVertical: 20,
    textAlign: 'center',
    color: yellow,
  },
  personTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  personLabel: {
    fontSize: 18,
    color: 'black',
  },
  person: {
    fontSize: 18,
    color: darkBlue,
  },
  submitButton: {
    ...mixinStyles.flexCenter,
    width: '50%',
    height: 45,
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 4,
    backgroundColor: darkBlue,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default WriteCapsule;
