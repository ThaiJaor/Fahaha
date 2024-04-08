import pandas as pd
import os
import glob
from django.core.management.base import BaseCommand
from books.import_serializers import ImportBookSerializer, ImportCategorySerializer, ImportPublisherSerializer
import json


class Command(BaseCommand):
    help = 'Import books from CSV files'

    def add_arguments(self, parser):
        parser.add_argument('folder_path', type=str,
                            help='Path to the folder containing CSV files')

    def handleCategories(self, df):
        for _, row in df.iterrows():
            serializer = ImportCategorySerializer(data=row.to_dict())
            if serializer.is_valid(raise_exception=True):
                serializer.save(validated_data=serializer.validated_data)

    def handlePublishers(self, df):
        for _, row in df.iterrows():
            serializer = ImportPublisherSerializer(data=row.to_dict())
            if serializer.is_valid(raise_exception=True):
                serializer.save()

    def handleBooks(self, df):
        for _, row in df.iterrows():
            categories = json.loads(row['categories'])
            publisher = row['publisher']
            categories_data = []
            for category in categories:
                category_data = {'name': category}
                categories_data.append(category_data)
            publisher_data = {'name': publisher}
            row['categories'] = categories_data
            row['publisher'] = publisher_data
            serializer = ImportBookSerializer(data=row.to_dict())
            if serializer.is_valid(raise_exception=True):
                serializer.save()

    def handle(self, *args, **kwargs):
        folder_path = kwargs['folder_path']
        csv_files = glob.glob(os.path.join(folder_path, '*.csv'))
        model_name = None
        print("-----------------------------------")
        for csv_file in csv_files:
            try:
                file_name = os.path.basename(csv_file)
                df = pd.read_csv(csv_file)
                print("Importing", file_name, end=' ')
                if (file_name == 'Categories.csv'):
                    print('to model Category')
                    model_name = 'Category'
                    self.handleCategories(df)
                elif (file_name == 'Publishers.csv'):
                    print('to model Publisher')
                    model_name = 'Publisher'
                    self.handlePublishers(df)
                elif (file_name == 'Books.csv'):
                    print('to model Book')
                    model_name = 'Book'
                    self.handleBooks(df)

                print('Fields:', list(df.columns))

                self.stdout.write(self.style.SUCCESS(
                    f'[{model_name}] imported successfully'))
                print("-----------------------------------")
            except Exception as e:
                self.stdout.write(self.style.ERROR(
                    f'Error importing [{model_name}]: {e}'))
                continue
