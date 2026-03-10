import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { HospitalResources } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ArrowLeft, MapPin, Building2, Calendar, Info, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resource, setResource] = useState<HospitalResources | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    loadResource();
  }, [id]);

  const loadResource = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<HospitalResources>('hospitalresources', id!);
      setResource(data);
      setNewStatus(data?.availabilityStatus || '');
    } catch (error) {
      console.error('Error loading resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!resource || !newStatus || newStatus === resource.availabilityStatus) return;

    try {
      setIsUpdating(true);
      await BaseCrudService.update<HospitalResources>('hospitalresources', {
        _id: resource._id,
        availabilityStatus: newStatus,
        lastUpdated: new Date().toISOString()
      });

      setResource({
        ...resource,
        availabilityStatus: newStatus,
        lastUpdated: new Date().toISOString()
      });

      toast({
        title: 'Status Updated',
        description: `Resource status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update resource status. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'Available':
        return <CheckCircle className="w-8 h-8 text-accentcyan" />;
      case 'In Use':
        return <Clock className="w-8 h-8 text-secondary-foreground opacity-50" />;
      case 'Maintenance':
        return <AlertCircle className="w-8 h-8 text-secondary-foreground opacity-50" />;
      case 'Unavailable':
        return <XCircle className="w-8 h-8 text-destructive" />;
      default:
        return <AlertCircle className="w-8 h-8 text-secondary-foreground opacity-50" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Available':
        return 'bg-accentcyan bg-opacity-10 text-accentcyan border-accentcyan';
      case 'In Use':
        return 'bg-secondary-foreground bg-opacity-10 text-secondary-foreground border-secondary-foreground';
      case 'Maintenance':
        return 'bg-secondary-foreground bg-opacity-10 text-secondary-foreground border-secondary-foreground';
      case 'Unavailable':
        return 'bg-destructive bg-opacity-10 text-destructive border-destructive';
      default:
        return 'bg-secondary-foreground bg-opacity-10 text-secondary-foreground border-secondary-foreground';
    }
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="w-full bg-primary py-12 px-8">
        <div className="max-w-[100rem] mx-auto">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-primary-foreground hover:text-accentcyan mb-6 -ml-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground">
              Resource Details
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Resource Details */}
      <section className="w-full bg-secondary py-16 px-8 min-h-[60vh]">
        <div className="max-w-[100rem] mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : !resource ? (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="font-heading text-2xl text-secondary-foreground mb-2">
                Resource Not Found
              </h2>
              <p className="font-paragraph text-base text-secondary-foreground opacity-70 mb-6">
                The requested resource could not be found.
              </p>
              <Link to="/dashboard">
                <Button className="bg-accentcyan text-primary hover:opacity-90">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Resource Header */}
                <div className="bg-background p-8 rounded-lg">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h2 className="font-heading text-3xl text-secondary-foreground mb-2">
                        {resource.resourceName}
                      </h2>
                      <p className="font-paragraph text-lg text-secondary-foreground opacity-70">
                        {resource.resourceType}
                      </p>
                    </div>
                    {getStatusIcon(resource.availabilityStatus)}
                  </div>

                  <div className={`inline-block px-6 py-3 rounded-full font-paragraph text-base border-2 ${getStatusColor(resource.availabilityStatus)}`}>
                    {resource.availabilityStatus}
                  </div>
                </div>

                {/* Location & Department */}
                <div className="bg-background p-8 rounded-lg">
                  <h3 className="font-heading text-xl text-secondary-foreground mb-6">
                    Location Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-accentcyan mr-4 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-paragraph text-sm text-secondary-foreground opacity-70 mb-1">
                          Location
                        </p>
                        <p className="font-paragraph text-base text-secondary-foreground">
                          {resource.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Building2 className="w-5 h-5 text-accentcyan mr-4 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-paragraph text-sm text-secondary-foreground opacity-70 mb-1">
                          Department
                        </p>
                        <p className="font-paragraph text-base text-secondary-foreground">
                          {resource.department}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                {resource.specifications && (
                  <div className="bg-background p-8 rounded-lg">
                    <div className="flex items-center mb-4">
                      <Info className="w-5 h-5 text-accentcyan mr-3" />
                      <h3 className="font-heading text-xl text-secondary-foreground">
                        Specifications
                      </h3>
                    </div>
                    <p className="font-paragraph text-base text-secondary-foreground opacity-70 leading-relaxed">
                      {resource.specifications}
                    </p>
                  </div>
                )}

                {/* Last Updated */}
                <div className="bg-background p-8 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-accentcyan mr-3" />
                    <div>
                      <p className="font-paragraph text-sm text-secondary-foreground opacity-70">
                        Last Updated
                      </p>
                      <p className="font-paragraph text-base text-secondary-foreground">
                        {formatDate(resource.lastUpdated)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update Panel */}
              <div className="lg:col-span-1">
                <div className="bg-primary p-8 rounded-lg sticky top-24">
                  <h3 className="font-heading text-xl text-primary-foreground mb-6">
                    Update Status
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="font-paragraph text-sm text-primary-foreground opacity-70 mb-3 block">
                        Current Status
                      </label>
                      <div className={`px-4 py-3 rounded-lg font-paragraph text-base ${getStatusColor(resource.availabilityStatus)} border-2`}>
                        {resource.availabilityStatus}
                      </div>
                    </div>

                    <div>
                      <label className="font-paragraph text-sm text-primary-foreground opacity-70 mb-3 block">
                        New Status
                      </label>
                      <Select value={newStatus} onValueChange={setNewStatus}>
                        <SelectTrigger className="w-full font-paragraph bg-secondary">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="In Use">In Use</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                          <SelectItem value="Unavailable">Unavailable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleStatusUpdate}
                      disabled={isUpdating || newStatus === resource.availabilityStatus}
                      className="w-full bg-accentcyan text-primary hover:opacity-90 font-paragraph"
                    >
                      {isUpdating ? 'Updating...' : 'Update Status'}
                    </Button>

                    <p className="font-paragraph text-xs text-primary-foreground opacity-50 text-center">
                      Status changes are logged and timestamped
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
