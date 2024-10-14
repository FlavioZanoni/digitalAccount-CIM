import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { PaginatedList } from '../../Lists/PaginatedList';
import { BaseEntity, Pagination } from '@/lib/api/types';

export interface OnClickProps {
  e: any;
  id: number;
}

type ApiFunction<T> = (params?: any) => Promise<Pagination<T>>;

type PageListProps<T> = {
  form?: ({
    id,
    setOpenDrawer,
  }: {
    id: number | undefined;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  }) => JSX.Element;
  title: string;
  subtitle?: string;
  label: string;
  apiFunction: ApiFunction<T>;
  currentId: number | undefined;
  setCurrentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  onClick?: ({ e, id }: OnClickProps) => void;
  search?: boolean;
  instances: string[];
  apiParams?: {
    key: string;
    value: string;
  }[];
  children?: React.ReactNode;
  dividerLabel?: string[];
  path?: string;
  accordion?: (data: any) => JSX.Element;
};

function ListPage<T extends BaseEntity>({
  form,
  title,
  subtitle,
  label,
  apiFunction,
  onClick,
  search,
  instances,
  apiParams,
  children,
  dividerLabel,
  path,
  currentId,
  setCurrentId,
  accordion,
}: PageListProps<T>) {
  const [query, setQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SecondaryHeader title={title} subtitle={subtitle} />
        <br />
        {instances.map((instance, index) => (
          <View key={index} style={styles.instanceContainer}>
            {dividerLabel?.[index] && (
              <Text style={styles.dividerLabel}>
                {dividerLabel[index]}
              </Text>
            )}

            <PaginatedList<T>
              form={form}
              title={title}
              label={label}
              apiFunction={apiFunction}
              param={apiParams?.[index]}
              currentId={currentId}
              setCurrentId={setCurrentId}
              onClick={onClick}
              instance={instance}
              query={query}
              path={path}
              accordion={accordion}
            >
              {children}
            </PaginatedList>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 174,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
    flexDirection: 'column',
    gap: 24,
    marginBottom: 24,
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  instanceContainer: {
    flexDirection: 'column',
    gap: 24,
    backgroundColor: 'white',
  },
  dividerLabel: {
    position: 'absolute',
    top: -24,
    backgroundColor: 'white',
    paddingBottom: 8,
    color: '#000000',
  },
});

export { ListPage };
