import django_filters
from .models import Volunteer, Wing, Level, Designation

class VolunteerFilter(django_filters.FilterSet):
    wing = django_filters.CharFilter(
        field_name='wing__name',
        lookup_expr='iexact'
    )
    level = django_filters.CharFilter(
        field_name='level__name',
        lookup_expr='iexact'
    )
    designation = django_filters.CharFilter(
        field_name='designation__title',
        lookup_expr='iexact'
    )
    joined_date_after = django_filters.DateFilter(
        field_name='joined_date',
        lookup_expr='gte',
        label='Joined Date After'
    )
    joined_date_before = django_filters.DateFilter(
        field_name='joined_date',
        lookup_expr='lte',
        label='Joined Date Before'
    )

    class Meta:
        model = Volunteer
        fields = [
            'wing',
            'level',
            'designation',
            'joined_date_after',
            'joined_date_before'
        ]

class LevelFilter(django_filters.FilterSet):
    wing = django_filters.CharFilter(
        field_name='wing__name',
        lookup_expr='iexact'
    )

    class Meta:
        model = Level
        fields = ['wing']

class DesignationFilter(django_filters.FilterSet):
    wing = django_filters.CharFilter(
        field_name='level__wing__name',
        lookup_expr='iexact'
    )

    level = django_filters.CharFilter(
        field_name='level__name',
        lookup_expr='iexact'
    )

    class Meta:
        model = Designation
        fields = ['level', 'wing']