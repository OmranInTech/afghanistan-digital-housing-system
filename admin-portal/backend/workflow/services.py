from .models import CitizenVerification, PropertyVerification, DealWorkflow


# -------------------------
# CITIZEN ACTION
# -------------------------
def update_citizen_verification(verification_id, status, remarks=None):
    obj = CitizenVerification.objects.get(id=verification_id)
    obj.status = status
    obj.remarks = remarks
    obj.save()
    return obj


# -------------------------
# PROPERTY ACTION
# -------------------------
def update_property_verification(verification_id, status, remarks=None):
    obj = PropertyVerification.objects.get(id=verification_id)
    obj.status = status
    obj.remarks = remarks
    obj.save()
    return obj


# -------------------------
# DEAL STEP UPDATE
# -------------------------
def update_deal_workflow(deal_id, **steps):
    obj = DealWorkflow.objects.get(deal_id=deal_id)

    for key, value in steps.items():
        if hasattr(obj, key):
            setattr(obj, key, value)

    obj.save()
    return obj