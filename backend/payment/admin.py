from django.contrib import admin
from .models import Payment
# Register your models here.

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'amount', 'status', 'timestamp')
    search_fields = ('name', 'email', 'phone', 'order_id', 'payment_id')
    list_filter = ('status', 'timestamp')
    readonly_fields = ('timestamp',)